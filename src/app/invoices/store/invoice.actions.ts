import { Action } from '@ngrx/store';
import { Invoice } from '../invoice.model';
import { Customer } from 'src/app/customers/customer.model';
import { Product } from 'src/app/products/product.model';
import { SetCustomersCount } from 'src/app/customers/store/customer.actions';
import { ProductInvoice } from 'src/app/products/products_invoice.model';

export const SET_INVOICES = '[Invoices] Set Invoices';
export const FETCH_INVOICES = '[Invoices] Fetch Invoices';
export const SET_INVOICES_COUNT = '[Invoices] Set Invoices Count';
export const FETCH_INVOICES_COUNT = '[Invoices] Fetch Invoices Count';
export const FETCH_INVOICES_BY_PAGE = '[Invoices] Fetch Invoices by page';
export const FETCH_INVOICES_BY_NAME = '[Invoices] Fetch Invoices by name';
export const ADD_INVOICE = '[Invoices] Add Invoice';
export const UPDATE_INVOICE = '[Invoices] Update Invoice';
export const DELETE_INVOICE = '[Invoices] Delete Invoice';
export const STORE_INVOICE = '[Invoices] Store Invoice';
export const PRINT_INVOICE = '[Invoices] Print Invoice';
export const LOADING_DONE = '[Invoices] Loading Done';

export const FETCH_CUSTOMERS_BY_NAME = '[Invoices] Fetch Customers By Name';

export const FAIL_INVOICE = '[Invoices] Fail Invoice';
export const CLEAR_ERROR = '[Invoices] Clear Error';
export const SET_VISIBILITY = '[Invoices] Set Visibility';
export const SET_CUSTOMERS = '[Invoices] Set Customers';
export const SET_CUST_COUNT = '[Invoices] Set Cust Count';
export const SET_PRODUCTS = '[Invoices] Set Products';
export const SET_PROD_COUNT = '[Invoices] Set Prod Count';

export class SetInvoices implements Action {
    readonly type = SET_INVOICES;
    constructor( public payload: Invoice[] ) {}
}

export class FetchInvoices implements Action {
    readonly type = FETCH_INVOICES;
}

export class FetchInvoicesCount implements Action {
    readonly type = FETCH_INVOICES_COUNT;
    constructor(public payload: string) {}
}

export class SetInvoicesCount implements Action {
    readonly type = SET_INVOICES_COUNT;
    constructor(public payload: number) {}
}

export class FetchInvoicesByPg implements Action {
    readonly type = FETCH_INVOICES_BY_PAGE;
    constructor(public payload: {pgNo: number; item_count: number}) {}
}

export class FetchInvoicesByName implements Action {
    readonly type = FETCH_INVOICES_BY_NAME;
    constructor(public payload: {cust_name: string; pgNo: number; item_count: number}) {}
}

export class AddInvoice implements Action {
    readonly type = ADD_INVOICE;
    constructor(public payload: Invoice) {}
}

export class UpdateInvoice implements Action {
    readonly type = UPDATE_INVOICE;
    constructor(public payload: {index: number; newInvoice: Invoice}) {}
}

export class DeleteInvoice implements Action {
    readonly type = DELETE_INVOICE;
    constructor(public payload: number) {}
}

export class StoreInvoices implements Action {
    readonly type = STORE_INVOICE;
}

export class PrintInvoice implements Action {
    constructor(public payload: number) {}
    readonly type = PRINT_INVOICE;
}

export class LoadingDone implements Action {
    readonly type = LOADING_DONE;
}

export class SetVisibility implements Action {
    readonly type = SET_VISIBILITY;
    constructor(public payload: boolean) {}
}

export class InvoiceFail implements Action {
    readonly type = FAIL_INVOICE;
    constructor(public payload: string ) {}
}

export class ClearError implements Action{
    readonly type = CLEAR_ERROR;
}

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor(public payload: Customer[]) {}
}

export class SetCustCount implements Action {
    readonly type = SET_CUST_COUNT;
    constructor(public payload: number) {}
}

export class SetProducts implements Action {
    readonly type = SET_PRODUCTS;
    //constructor(public payload: ProductInvoice[]) {}
}

export class SetProdCount implements Action {
    readonly type = SET_PROD_COUNT;
    constructor(public payload: number) {}
}

export type InvoicesActions =
| SetInvoices
| FetchInvoices
| FetchInvoicesCount
| SetInvoicesCount
| FetchInvoicesByPg
| FetchInvoicesByName
| AddInvoice
| UpdateInvoice
| DeleteInvoice
| StoreInvoices
| PrintInvoice
| LoadingDone
| SetVisibility
| InvoiceFail
| ClearError
| SetCustomers
| SetCustomersCount
| SetProducts
| SetProdCount;