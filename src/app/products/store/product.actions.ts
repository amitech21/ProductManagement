import { Action } from '@ngrx/store';
import { Product } from '../product.model';
import { FetchCustomersByPg } from 'src/app/customers/store/customer.actions';

export const SET_PRODUCTS = '[Products] Set Products';
// export const FETCH_PRODUCTS = '[Products] Fetch Products';
export const SET_PRODUCTS_COUNT = '[Products] Set Products Count';
export const FETCH_PRODUCTS_COUNT = '[Products] Fetch Products Count';
export const FETCH_PRODUCTS_BY_PAGE = '[Products] Fetch Products by page';
export const ADD_PRODUCT = '[Products] Add Product';
export const UPDATE_PRODUCT = '[Products] Update Product';
export const DELETE_PRODUCT = '[Products] Delete Product';
export const STORE_PRODUCT = '[Products] Store Product';

export const SET_VISIBILITY = '[Products] Set Visibility';



export class SetProducts implements Action {
    readonly type = SET_PRODUCTS;
    constructor( public payload: Product[] ) {}
}

// export class FetchProducts implements Action {
//     readonly type = FETCH_PRODUCTS;
// }

export class FetchProductsCount implements Action {
    readonly type = FETCH_PRODUCTS_COUNT;
}

export class SetProductsCount implements Action {
    readonly type = SET_PRODUCTS_COUNT;
    constructor(public payload: number) {}
}

export class FetchProductsByPg implements Action {
    readonly type = FETCH_PRODUCTS_BY_PAGE;
    constructor(public payload: {pgNo: number; item_count: number}) {}
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
// | FetchProducts
| FetchProductsCount
| SetProductsCount
| FetchCustomersByPg
| AddProduct
| UpdateProduct
| DeleteProduct
| StoreProducts
| SetVisibility;