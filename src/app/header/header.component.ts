import { Component,EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as ProductActions from '../products/store/product.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    
    constructor(
        private store: Store<fromApp.AppState> 
    ){}
    

    ngOnInit() {
        //this.userSub = this.authService.user.subscribe(user => {
        this.userSub = this.store
        .select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
            //console.log(user);
            this.isAuthenticated = !user ? false : true;
        });
    }

    collapsed = true;
    @Output('featureSelected') featureSelected = new EventEmitter<string>();

    onSelect(featureSelected: string){
        //this.featureSelected = featureSelected;
        this.featureSelected.emit(featureSelected);
    }

    onSaveData() {
        //this.dataStorageService.storeProducts();
        this.store.dispatch(new ProductActions.StoreProducts() );
    }

    onFetchData() {
        // this.dataStorageService.fetchProducts().subscribe();
        //this.store.dispatch(new ProductActions.FetchProducts() );
    }

    onLogout() {
        //this.authService.logout();
        this.store.dispatch(new AuthActions.Logout() );
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

}