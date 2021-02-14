import { Customer } from '../customer.model';
import * as CustomersActions from '../store/customer.actions'

export interface State { 
    customers: Customer[] ; 
    visibility: boolean;
    cust_total_count: number;
    custError: string;
    custLoading: boolean;
}

const initialState: State = { 
    customers: [] , 
    visibility: true , 
    cust_total_count: 0 ,
    custError: null,
    custLoading: false
};


export function customerReducer(state = initialState , action: CustomersActions.CustomersActions){

    //let updatedCustomers: Customer[] = [];

    switch(action.type) {

        case CustomersActions.FETCH_CUSTOMERS:
            return {
                ...state,
                custLoading: true
            };

        case CustomersActions.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload, ...state.customers,
                visibility: true,
                custLoading: false
            };

        case CustomersActions.FETCH_CUSTOMERS_BY_PAGE:
            return {
                ...state,
                custLoading: true
            };

        case CustomersActions.FETCH_CUSTOMERS_COUNT:
            return {
                ...state,
                custLoading: true
            };

        case CustomersActions.SET_CUSTOMERS_COUNT:
            return {
                ...state,
                cust_total_count: action.payload,
                custLoading: false
            };

        case CustomersActions.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload],
                custLoading: true
            };
        
        case CustomersActions.UPDATE_CUSTOMER:
            const updatedCustomers = [...state.customers];
            state.customers.filter((customer, index)=> {  
                if(customer.id === action.payload.newCustomer.id)
                {
                    updatedCustomers[index] = action.payload.newCustomer;
                }
            })
            return {
                ...state,
                //customers: []
                customers: updatedCustomers,
                custLoading: true
            };

        case CustomersActions.DELETE_CUSTOMER:
            return {
                ...state,
                //customers: []
                customers: state.customers.filter((customer, index)=> {
                    return customer.id !== action.payload;
                }),
                custLoading: true
            };

        case CustomersActions.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload
            };

         case CustomersActions.FAIL_CUSTOMER:
            return {
                ...state,
                custError: action.payload , 
                custLoading: false
            };

        case CustomersActions.CLEAR_ERROR:
            return {
                ...state,
                custError: null
            };
        
        default:
            return state;        
    }
        
}