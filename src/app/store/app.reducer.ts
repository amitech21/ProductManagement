import * as fromAuth from '../auth/store/auth.reducer'
import * as fromProducts from '../products/store/product.reducer'
import { ActionReducerMap } from '@ngrx/store'


export interface AppState {
    //shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    products: fromProducts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    //shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    products: fromProducts.productReducer
};
