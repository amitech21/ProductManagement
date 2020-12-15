import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { of , from  } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";
import { AppService } from '../../appservice';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
) => {

        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000 ));

        //store data in cache
        const user = new User(email,userId,token,expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        // of() to create new Observable
        return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    });
};

const handleError = (errorRes: any) => {

    let errorMessage = "Unknown error occured !!!!";

                if(!errorRes)
                    return of(new AuthActions.AuthenticateFail(errorMessage));
                else if(!errorRes.error)
                    return of(new AuthActions.AuthenticateFail(errorRes));
                else if(!errorRes.error.error)
                    return of(new AuthActions.AuthenticateFail(errorRes.error));
                else if(!errorRes.error.error.message)
                    return of(new AuthActions.AuthenticateFail(errorRes.error.error));

   
                    switch(errorRes.error.error.message) {
                        case 'INVALID_EMAIL': {
                            errorMessage = "Invalid email entered.";
                            break;
                        }

                        case 'EMAIL_EXISTS': {
                            errorMessage = "Email already exist.";
                            break;
                        }

                        case 'EMAIL_NOT_FOUND': {
                            errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                            break;
                        }

                        case 'INVALID_PASSWORD': {
                            errorMessage = "The password is invalid or the user does not have a password.";
                            break;
                        }

                        case 'USER_DISABLED': {
                            errorMessage = "The user account has been disabled by an administrator.";
                            break;
                        }
                    }

                   

                    // of() to create new Observable
                    return of(new AuthActions.AuthenticateFail(errorMessage));
};

// to inject services in constructor
@Injectable()
export class AuthEffects {

    googleResponse: SocialUser;
    googleErrors: any;

    @Effect()
    googleSignIn = this.actions$
    .pipe(
        ofType(AuthActions.GOOGLE_LOGIN),
        switchMap((authData: AuthActions.GoogleLogin) => {

            return from(this.gAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
                .then((res_g: SocialUser) => {
                    this.googleResponse = res_g;
                })
              .catch((errorRes) => {
                this.googleErrors = errorRes;
              })
              ).pipe(
                    map(() => {

                    return handleAuthentication(
                        3600,                       // Set expiry of token for google login
                        this.googleResponse.email,
                        this.googleResponse.id,
                        this.googleResponse.idToken
                    ); 
                  }),
                  catchError(errorRes => {
                      return handleError(this.googleErrors);
                  })
              );           
                         
        }),
    );

    @Effect()
    authSignup = this.actions$
    .pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(
                        +resData.expiresIn,
                        resData.expiresIn,
                        resData.localId,
                        resData.idToken
                    );                    
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
            );
        })
    );
    
    @Effect()
    authLogin = this.actions$
    .pipe(
        // filter use to fetch exact action , we want to proccess
        ofType(AuthActions.LOGIN_START),
        // Switch to new Observable
        switchMap((authData: AuthActions.LoginStart) => {
            // return An Observable of the HTTPResponse for the request, 
            // with a response body in the requested type.
            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    return handleAuthentication(
                        +resData.expiresIn,
                        resData.email,
                        resData.localId,
                        resData.idToken
                    );                    
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                })
                
            );
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$
        .pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap( (authSuccessAction: AuthActions.AuthenticateSuccess) => {
                console.log("AuthenticateSuccess called !!");
                if(authSuccessAction.payload.redirect){
                    this.appService.setUserLoggedIn(true);
                    this.router.navigate(['/recipes']);
                }
                    
            })
        )

    @Effect()
    autoLogin = this.actions$
        .pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {
                const userData: {
                    email:string,
                    id: string,
                    _token: string,
                    _tokenExpirationDate: string
                } = JSON.parse(localStorage.getItem('userData'));
                if(!userData)
                    return { type: 'DUMMY' };
                
                 const loadedUser = new User(
                     userData.email,
                     userData.id,
                     userData._token,
                     new Date(userData._tokenExpirationDate)
                 ); 
                 
                 if(loadedUser.token) {
                    const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
                                                 - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    // this.user.next(loadedUser);
                    return new AuthActions.AuthenticateSuccess({
                            email: loadedUser.email,
                            userId: loadedUser.id,
                            token: loadedUser.token,
                            expirationDate: new Date(userData._tokenExpirationDate),
                            redirect: false
                            })
                    
        
                    //  const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
                    //                             - new Date().getTime();
                    //  this.autoLogout(expirationDuration);
                 }

                 return { type: 'DUMMY' };
            })
        )

    @Effect({ dispatch: false })
    authLogout = this.actions$
        .pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                this.authService.clearLogoutTimer();
                this.router.navigate(['/']);
                localStorage.removeItem('userData');
            })
        )

    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private router: Router,
        private authService: AuthService, // use authService in effects class
        private gAuthService: SocialAuthService,
        private appService: AppService
    ) {}
}