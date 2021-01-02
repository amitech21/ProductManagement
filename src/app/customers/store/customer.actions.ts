import { Action } from '@ngrx/store';
import { Customer } from '../customer.model';

export const SET_CUSTOMERS = '[Customers] Set Customers';
export const FETCH_CUSTOMERS = '[Customers] Fetch Customers';
export const FETCH_CUSTOMERS_BY_NAME = '[Customers] Fetch Customers by name';
export const ADD_CUSTOMER = '[Customers] Add Customer';
export const UPDATE_CUSTOMER = '[Customers] Update Customer';
export const DELETE_CUSTOMER = '[Customers] Delete Customer';
export const STORE_CUSTOMER = '[Customers] Store Customer';

export const SET_VISIBILITY = '[Customers] Set Visibility';

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor( public payload: Customer[] ) {}
}

export class FetchCustomers implements Action {
    readonly type = FETCH_CUSTOMERS;
}


export class AddCustomer implements Action {
    readonly type = ADD_CUSTOMER;
    constructor(public payload: Customer) {}
}

export class UpdateCustomer implements Action {
    readonly type = UPDATE_CUSTOMER;
    constructor(public payload: {index: number; newCustomer: Customer}) {}
}

export class DeleteCustomer implements Action {
    readonly type = DELETE_CUSTOMER;
    constructor(public payload: number) {}
}

export class StoreCustomers implements Action {
    readonly type = STORE_CUSTOMER;
}

export class SetVisibility implements Action {
    readonly type = SET_VISIBILITY;
    constructor(public payload: boolean) {}
}

export type CustomersActions =
| SetCustomers
| FetchCustomers
| AddCustomer
| UpdateCustomer
| DeleteCustomer
| StoreCustomers
| SetVisibility;