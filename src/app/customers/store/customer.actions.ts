import { Action } from '@ngrx/store';
import { Customer } from '../customer.model';

export const SET_CUSTOMER = '[Customers] Set Customer';
export const SET_CUSTOMERS = '[Customers] Set Customers';
export const FETCH_CUSTOMERS = '[Customers] Fetch Customers';
export const SET_CUSTOMERS_COUNT = '[Customers] Set Customers Count';
export const FETCH_CUSTOMERS_COUNT = '[Customers] Fetch Customers Count';
export const FETCH_CUSTOMERS_BY_PAGE = '[Customers] Fetch Customers by page';
export const ADD_CUSTOMER = '[Customers] Add Customer';
export const UPDATE_CUSTOMER = '[Customers] Update Customer';
export const DELETE_CUSTOMER = '[Customers] Delete Customer';
export const STORE_CUSTOMER = '[Customers] Store Customer';

export const FAIL_CUSTOMER = '[Customers] Fail Customers';
export const CLEAR_ERROR = '[Customers] Clear Error';
export const SET_VISIBILITY = '[Customers] Set Visibility';

export class SetCustomer implements Action {
    readonly type = SET_CUSTOMER;
    constructor( public payload: Customer ) {}
}

export class SetCustomers implements Action {
    readonly type = SET_CUSTOMERS;
    constructor( public payload: Customer[] ) {}
}

export class FetchCustomers implements Action {
    readonly type = FETCH_CUSTOMERS;
}

export class FetchCustomersCount implements Action {
    readonly type = FETCH_CUSTOMERS_COUNT;
}

export class SetCustomersCount implements Action {
    readonly type = SET_CUSTOMERS_COUNT;
    constructor(public payload: number) {}
}

export class FetchCustomersByPg implements Action {
    readonly type = FETCH_CUSTOMERS_BY_PAGE;
    constructor(public payload: {pgNo: number; item_count: number}) {}
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

export class CustomerFail implements Action {
    readonly type = FAIL_CUSTOMER;
    constructor(public payload: string ) {}
}

export class ClearError implements Action{
    readonly type = CLEAR_ERROR;
}

export type CustomersActions =
| SetCustomer
| SetCustomers
| FetchCustomers
| FetchCustomersCount
| SetCustomersCount
| FetchCustomersByPg
| AddCustomer
| UpdateCustomer
| DeleteCustomer
| StoreCustomers
| SetVisibility
| CustomerFail
| ClearError;