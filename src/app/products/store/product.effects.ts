import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProductsActions from '../store/product.actions';
import { switchMap, map, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'


@Injectable()
export class ProductEffects {

    @Effect()
    fetchProducts = this.actions$.pipe(
        ofType(ProductsActions.FETCH_PRODUCTS),
        switchMap(() => {
            return this.http.get<Product[]>(environment.webAppEndPoint + '/products/list')
        }),
        map(products => {
            return products.map( product => {
                 return {...product};
            });
        }),
        tap(products => {
            localStorage.setItem('products', JSON.stringify(products));
        }),
        map(products => {
            return new ProductsActions.SetProducts(products);
        })
    ); 

    @Effect({dispatch: false})
    storeProducts = this.actions$.pipe(
        ofType(ProductsActions.STORE_PRODUCT),
        withLatestFrom(
            this.store.select('products')
        ), // Add value from one Observable to another
        // actionData : is action from ofType()
        // productsState : is data from withLatestFrom
        switchMap(([actionData, productsState]) => {
            return this.http.put(
                environment.webAppEndPoint + '/products/add',
                productsState.products
                );
        })
    );

    @Effect({dispatch: false})
    addProduct = this.actions$.pipe(
        ofType(ProductsActions.ADD_PRODUCT),
       
        switchMap((productData: ProductsActions.AddProduct) => {
            console.log(productData.payload);

            const headerDict = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
              }
            const requestOptions = {                                                                                                                                                                                 
                headers: new HttpHeaders(headerDict), 
              };

            return this.http.post(
                environment.webAppEndPoint + '/products/add' , 
                productData.payload , 
                requestOptions)
                .pipe(
                    tap(response => {
                        console.log("http tap");
                        //console.log(response.toString);
                    }),
                    map(()=>{
                        console.log("http map");
                        //return new ProductsActions.AddProduct(productData.payload);
                    })
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
        ) {}
}