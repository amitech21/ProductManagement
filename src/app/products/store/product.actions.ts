import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export const SET_PRODUCTS = '[Products] Set Products';
export const FETCH_PRODUCTS = '[Products] Fetch Products';
export const ADD_PRODUCT = '[Products] Add Product';
export const UPDATE_PRODUCT = '[Products] Update Product';
export const DELETE_PRODUCT = '[Products] Delete Product';
export const STORE_PRODUCT = '[Products] Store Product';

export const SET_VISIBILITY = '[Products] Set Visibility';



export class SetProducts implements Action {
    readonly type = SET_PRODUCTS;
    constructor( public payload: Product[] ) {}
}

export class FetchProducts implements Action {
    readonly type = FETCH_PRODUCTS;
}

export class AddProduct implements Action {
    readonly type = ADD_PRODUCT;
    constructor(public payload: Product) {}
}

export class UpdateProduct implements Action {
    readonly type = UPDATE_PRODUCT;
    constructor(public payload: {index: number; newProduct: Product}) {}
}

export class DeleteProduct implements Action {
    readonly type = DELETE_PRODUCT;
    constructor(public payload: number) {}
}

export class StoreProducts implements Action {
    readonly type = STORE_PRODUCT;
}

export class SetVisibility implements Action {
    readonly type = SET_VISIBILITY;
    constructor(public payload: boolean) {}
}

export type ProductsActions =
| SetProducts
| FetchProducts
| AddProduct
| UpdateProduct
| DeleteProduct
| StoreProducts
| SetVisibility;