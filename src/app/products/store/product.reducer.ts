import { Product } from '../product.model';
import * as ProductsActions from '../store/product.actions'

export interface State { 
    products: Product[] ; 
    visibility: boolean;
}

const initialState: State = { products: [] , visibility: true };

export function productReducer(state = initialState , action: ProductsActions.ProductsActions){

    switch(action.type) {
        case ProductsActions.SET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload]
            };

        case ProductsActions.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        
        case ProductsActions.UPDATE_PRODUCT:
            const updatedProduct = {
                ...state.products[action.payload.index],
                ...action.payload.newProduct
            };

            const updatedProducts = [...state.products];
            updatedProducts[action.payload.index] = updatedProduct;

            return {
                ...state,
                products: updatedProducts
            };

        case ProductsActions.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((product, index)=> {
                    return index !== action.payload;
                })
            };

        case ProductsActions.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload
            };
        
        default:
            return state;        
    }
        
}