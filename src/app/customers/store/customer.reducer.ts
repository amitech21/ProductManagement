import { Customer } from '../customer.model';
import * as CustomersActions from '../store/customer.actions'

export interface State { 
    customers: Customer[] ; 
    visibility: boolean;
    cust_total_count: number;
}

const initialState: State = { customers: [] , visibility: true , cust_total_count: 0 };


export function customerReducer(state = initialState , action: CustomersActions.CustomersActions){

    //let updatedCustomers: Customer[] = [];

    switch(action.type) {

        case CustomersActions.SET_CUSTOMERS_COUNT:
            return {
                ...state,
                cust_total_count: action.payload
            };

        case CustomersActions.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            };

        case CustomersActions.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload]
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
                customers: updatedCustomers
            };

            // const updatedCustomer = {
            //     ...state.customers[action.payload.index],
            //     ...action.payload.newCustomer
            // };

            // const updatedCustomers = [...state.customers];
            // updatedCustomers[action.payload.index] = updatedCustomer;

            // return {
            //     ...state,
            //     customers: updatedCustomers
            // };

        case CustomersActions.DELETE_CUSTOMER:
            return {
                ...state,
                //customers: []
                customers: state.customers.filter((customer, index)=> {
                    return customer.id !== action.payload;
                })
            };

        case CustomersActions.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload
            };
        
        default:
            return state;        
    }
        
}