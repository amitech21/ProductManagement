import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProductsActions from '../store/product.actions';
import { switchMap, map, withLatestFrom, tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'
import { Product_add } from '../product_add.model';
import { of } from 'rxjs';


@Injectable()
export class ProductEffects {
    product:Product;
    products:Product[];
    //updated_products:Product[] = [];

    @Effect({dispatch: true})
    fetchProductsCount = this.actions$.pipe(
        ofType(ProductsActions.FETCH_PRODUCTS_COUNT),
        switchMap(() => {
            return this.http.get<number>(environment.webAppEndPoint + '/products/listCount')
            .pipe(
                map((count: number) => {
                    return new ProductsActions.SetProductsCount(count);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        }),
    );

    @Effect({dispatch: true})
    fetchProductsByPg = this.actions$.pipe(
        ofType(ProductsActions.FETCH_PRODUCTS_BY_PAGE),
        switchMap((paylod_data: ProductsActions.FetchProductsByPg) => {
            return this.http.get<Product[]>(
                environment.webAppEndPoint + '/products/listByPage/'
                + paylod_data.payload.pgNo
                + '/'
                + paylod_data.payload.item_count                
            ).pipe(
                map((products: Product[]) => {
                    return new ProductsActions.SetProducts(products);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );


    @Effect({dispatch: true})
    addProduct = this.actions$.pipe(
        ofType(ProductsActions.ADD_PRODUCT),
       
        switchMap((productData: ProductsActions.AddProduct) => {

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
                new Product_add(
                    productData.payload.name,
                    productData.payload.description,
                    productData.payload.imagePath,
                    productData.payload.price
                ), 
                
                requestOptions).pipe(
                    map(() => {
                        return new ProductsActions.SetProducts(this.products);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect({dispatch: true})
    updateProduct = this.actions$.pipe(
        ofType(ProductsActions.UPDATE_PRODUCT),
        switchMap((productData: ProductsActions.UpdateProduct) => {

            this.store.select('products').subscribe(prodState => {
                this.products = prodState.products;
                // prodState.products.filter((product, index)=> {
                //     if(product.id === productData.payload.newProduct.id)
                //         this.updated_products.push(productData.payload.newProduct);
                //     else 
                //         this.updated_products.push(product);
                // })
            });

            const headerDict = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
              }
            const requestOptions = {                                                                                                                                                                                 
                headers: new HttpHeaders(headerDict), 
              };

            return this.http.put(
                environment.webAppEndPoint + '/products/update/' +  productData.payload.newProduct.id.toString(), 
                productData.payload.newProduct , 
                requestOptions)
                .pipe(
                    map(() => {
                        return new ProductsActions.SetProducts(this.products);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
            })
    );

    @Effect({dispatch: true})
    deleteProduct = this.actions$.pipe(
        ofType(ProductsActions.DELETE_PRODUCT),
        switchMap((payload: ProductsActions.DeleteProduct) => {

            this.store.select('products').subscribe(prodState => {
                this.products = prodState.products;
                prodState.products.filter((product, index)=> {
                    return product.id !== payload.payload;
                })
            });

            return this.http.delete(environment.webAppEndPoint + '/products/delete/' + payload.payload.toString() )
            .pipe(
                map(() => {
                    return new ProductsActions.SetProducts(this.products);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
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

const handleError = (errorRes: HttpErrorResponse | any) => {

    let errorMessage = "Unknown error occured !!!!";

                if(errorRes.status == 0)
                    return of(new ProductsActions.ProductFail("Connection refused from API server"));
                else if(!errorRes)
                    return of(new ProductsActions.ProductFail(errorMessage));
                else if(!errorRes.error)
                    return of(new ProductsActions.ProductFail(errorRes));
                else if(!errorRes.error.error)
                    return of(new ProductsActions.ProductFail(errorRes.error));
                else if(!errorRes.error.error.message)
                    return of(new ProductsActions.ProductFail(errorRes.error.error));

                    // of() to create new Observable
                    return of(new ProductsActions.ProductFail(errorRes.error.error.message));
};