import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProductsActions from '../store/product.actions';
import { switchMap, map, withLatestFrom, tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'
import { Product_add } from '../product_add.model';


@Injectable()
export class ProductEffects {
    product:Product;
    products:Product[];
    updated_products:Product[] = [];

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
                
                requestOptions);
        }),
        switchMap(()=>{
            return this.http.get(environment.webAppEndPoint + '/products/list').pipe(
                tap((res: Product[]) =>{
                    // add product to cache
                    localStorage.setItem('products', JSON.stringify(res));
                } )
            );
        })
    );

    @Effect({dispatch: false})
    updateProduct = this.actions$.pipe(
        ofType(ProductsActions.UPDATE_PRODUCT),
        switchMap((productData: ProductsActions.UpdateProduct) => {
            //console.log(productData.payload.newProduct);

            this.products = JSON.parse(localStorage.getItem('products'));
            this.products.filter((product, index)=> {
                //return product.id !== productData.payload.index;
                
                if(product.id === productData.payload.newProduct.id)
                    this.updated_products.push(productData.payload.newProduct);
                else 
                    this.updated_products.push(product);
            })
            localStorage.setItem('products', JSON.stringify(this.updated_products));

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
                    tap(response => {
                        console.log("http tap in update");
                        console.log(response);
                    }),
                    map(()=>{
                        //console.log("http map");
                        //return new ProductsActions.AddProduct(productData.payload);
                    })
            );
        })
    );

    @Effect({dispatch: false})
    deleteProduct = this.actions$.pipe(
        ofType(ProductsActions.DELETE_PRODUCT),
        //map( action => action.payload ),
        switchMap((payload: ProductsActions.DeleteProduct) => {

            this.products = JSON.parse(localStorage.getItem('products'));
            this.products = this.products.filter((product, index)=> {
                return product.id !== payload.payload;
            })
            localStorage.setItem('products', JSON.stringify(this.products));

            return this.http.delete(environment.webAppEndPoint + '/products/delete/' + payload.payload.toString() )
            .pipe(
                map(() => {
                            // return new ProductsActions.SetProducts(this.products);      
                        }
                    )
            );
        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
        ) {} 
}