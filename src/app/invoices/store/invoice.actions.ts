import { Action } from '@ngrx/store';
import { Invoice } from '../invoice.model';

export const SET_INVOICES = '[Invoices] Set Invoices';
export const FETCH_INVOICES = '[Invoices] Fetch Invoices';
export const ADD_INVOICE = '[Invoices] Add Invoice';
export const UPDATE_INVOICE = '[Invoices] Update Invoice';
export const DELETE_INVOICE = '[Invoices] Delete Invoice';
export const STORE_INVOICE = '[Invoices] Store Invoice';

export const SET_VISIBILITY = '[Invoices] Set Visibility';

export class SetInvoices implements Action {
    readonly type = SET_INVOICES;
    constructor( public payload: Invoice[] ) {}
}

export class FetchInvoices implements Action {
    readonly type = FETCH_INVOICES;
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

export class SetVisibility implements Action {
    readonly type = SET_VISIBILITY;
    constructor(public payload: boolean) {}
}

export type InvoicesActions =
| SetInvoices
| FetchInvoices
| AddInvoice
| UpdateInvoice
| DeleteInvoice
| StoreInvoices
| SetVisibility;