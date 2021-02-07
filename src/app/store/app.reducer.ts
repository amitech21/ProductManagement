import * as fromAuth from '../auth/store/auth.reducer'
import * as fromProducts from '../products/store/product.reducer'
import * as fromCustomers from '../customers/store/customer.reducer'
import * as fromInvoices from '../invoices/store/invoice.reducer'


import { ActionReducerMap } from '@ngrx/store'


export interface AppState {
    //shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    products: fromProducts.State;
    customers: fromCustomers.State;
    invoices: fromInvoices.State;    
}

export const appReducer: ActionReducerMap<AppState> = {
    //shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    products: fromProducts.productReducer,
    customers: fromCustomers.customerReducer,
    invoices: fromInvoices.invoiceReducer
};
