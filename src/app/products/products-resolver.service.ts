import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';
import * as ProductActions from '../products/store/product.actions'
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsResolverService implements Resolve<Product[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | import("rxjs").Observable<Product[]> | Promise<Product[]> {
        
        // if (products.length === 0) {
            //return this.dataStorageService.fetchProducts();

        
            return this.store.select('products').pipe(
                take(1),
                map(productsState => {
                    return productsState.products;
                })
                // switchMap(products => {
                //     if(products.length == 0){
                //         
                //         // this.store.dispatch(new ProductActions.FetchProducts() );
                //         this.store.dispatch(new ProductActions.FetchProductsCount() );
                //         this.store.dispatch(new ProductActions.FetchProductsByPg({
                //             pgNo: 0,
                //             item_count: 4
                //           }) );
                //         return this.actions$.pipe(
                //             ofType(ProductActions.SET_PRODUCTS),  
                //             take(1)
                //         );
                        
                //     }else {
                //         return of(products); 
                //     }
                // })
            );

           

        // } else {
        //     return products;
        // }
    }  

}