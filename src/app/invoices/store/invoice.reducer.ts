import { Invoice } from '../invoice.model';
import * as InvoicesActions from '../store/invoice.actions'
import { Customer } from 'src/app/customers/customer.model';
import { ProductInvoice } from 'src/app/products/products_invoice.model';

export interface State { 
    invoices: Invoice[] ;
    visibility: boolean;
    inc_total_count: number;
    customers: Customer[];
    cust_count: number; 
    products: ProductInvoice[];
    prod_count: number;
    incError: string;
    incLoading: boolean;
}

const initialState: State = { 
    invoices: [] , 
    visibility: true,
    inc_total_count: 0,
    customers: [] ,
    cust_count: 0,
    products: [],
    prod_count: 0,
    incError: null , 
    incLoading: false
  };


export function invoiceReducer(state = initialState , action: InvoicesActions.InvoicesActions){

    //let updatedInvoices: Invoice[] = [];

    switch(action.type) {
        case InvoicesActions.SET_INVOICES:
            return {
                ...state,
                invoices: action.payload, ...state.invoices,
                visibility: true,
                incLoading: false
            };

            case InvoicesActions.FETCH_INVOICES_BY_PAGE:
                return {
                    ...state,
                    incLoading: true
                };

            case InvoicesActions.FETCH_INVOICES_BY_NAME:
                return {
                    ...state,
                    incLoading: true
                };
    
            case InvoicesActions.FETCH_INVOICES_COUNT:
                return {
                    ...state,
                    incLoading: true
                };
    
            case InvoicesActions.SET_INVOICES_COUNT:
                return {
                    ...state,
                    inc_total_count: action.payload,
                    incLoading: false
                };

        case InvoicesActions.ADD_INVOICE:
            return {
                ...state,
                invoices: [...state.invoices, action.payload],
                incLoading: true
            };
        
        case InvoicesActions.UPDATE_INVOICE:
            const updatedInvoices = [...state.invoices];
            state.invoices.filter((invoice, index)=> {  
                if(invoice.id === action.payload.newInvoice.id)
                {
                    updatedInvoices[index] = action.payload.newInvoice;
                }
            })
            return {
                ...state,
                //invoices: []
                invoices: updatedInvoices,
                incLoading: true
            };

        case InvoicesActions.DELETE_INVOICE:
            return {
                ...state,
                //invoices: []
                invoices: state.invoices.filter((invoice, index)=> {
                    return invoice.id !== action.payload;
                }),
                incLoading: true
            };

        case InvoicesActions.PRINT_INVOICE:
            return {
                ...state,
                incLoading: true
            };

        case InvoicesActions.LOADING_DONE:
            return {
                ...state,
                incLoading: false
            };

        case InvoicesActions.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload
            };

        case InvoicesActions.FAIL_INVOICE:
            return {
                ...state,
                incError: action.payload , 
                incLoading: false
            };

        case InvoicesActions.CLEAR_ERROR:
            return {
                ...state,
                incError: null
            }; 
        
        case InvoicesActions.SET_PRODUCTS:
            return {
                ...state,
                //products: action.payload, ...state.products,
                visibility: true,
                incLoading: false
            };

        default:
            return state;        
    }
        
}