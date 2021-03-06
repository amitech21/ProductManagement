import { Product } from '../product.model';
import * as ProductsActions from '../store/product.actions'

export interface State { 
    product: Product ; 
    products: Product[] ; 
    visibility: boolean;
    prod_total_count: number;
    prodError: string;
    prodLoading: boolean;

}

const initialState: State = { 
    product: null ,
    products: [] , 
    visibility: true , 
    prod_total_count: 0 , 
    prodError: null , 
    prodLoading: false
};


export function productReducer(
    state = initialState , 
    action: ProductsActions.ProductsActions
    ){

    //let updatedProducts: Product[] = [];

    switch(action.type) {

        case ProductsActions.SET_PRODUCT:
            return {
                ...state,
                product: action.payload, ...state.product
            };

        case ProductsActions.FETCH_PRODUCTS:
            return {
                ...state,
                prodLoading: true
            };

        case ProductsActions.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload, ...state.products,
                visibility: true,
                prodLoading: false

            };

        case ProductsActions.FETCH_PRODUCTS_BY_PAGE:
            return {
                ...state,
                prodLoading: true
            };

        case ProductsActions.FETCH_PRODUCTS_COUNT:
            return {
                ...state,
                prodLoading: true
            };

        case ProductsActions.SET_PRODUCTS_COUNT:
            return {
                ...state,
                prod_total_count: action.payload,
                prodLoading: false
            };

        case ProductsActions.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
                prodLoading: true
            };
        
        case ProductsActions.UPDATE_PRODUCT:
            let updatedProducts = [...state.products];
            state.products.filter((product, index)=> {  
                if(product.id === action.payload.newProduct.id)
                {
                    updatedProducts[index] = action.payload.newProduct;
                }
            })
            return {
                ...state,
                //products: []
                products: updatedProducts,
                prodLoading: true
            };

        case ProductsActions.DELETE_PRODUCT:
            return {
                ...state,
                //products: []
                products: state.products.filter((product, index)=> {
                    return product.id !== action.payload;
                }),
                prodLoading: true
            };

        case ProductsActions.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload
            };
        
        case ProductsActions.FAIL_PRODUCT:
            return {
                ...state,
                prodError: action.payload , 
                prodLoading: false
            };

        case ProductsActions.CLEAR_ERROR:
            return {
                ...state,
                prodError: null
            };
        
            default:
                if (localStorage.getItem('productsState')) {
                    var newState = JSON.parse(localStorage.getItem('productsState'))          
                    return newState
                }
                else {
                    return {...state};
                }      
    }
        
}