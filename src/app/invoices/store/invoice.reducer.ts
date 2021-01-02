import { Invoice } from '../invoice.model';
import * as InvoicesActions from '../store/invoice.actions'
import { Customer } from 'src/app/customers/customer.model';

export interface State { 
    invoices: Invoice[] ;
    customers: Customer[] ; 
    visibility: boolean;
}

const initialState: State = { invoices: [] , customers: [] , visibility: true };


export function invoiceReducer(state = initialState , action: InvoicesActions.InvoicesActions){

    //let updatedInvoices: Invoice[] = [];

    switch(action.type) {
        case InvoicesActions.SET_INVOICES:
            return {
                ...state,
                invoices: [...action.payload]
            };

        case InvoicesActions.ADD_INVOICE:
            return {
                ...state,
                invoices: [...state.invoices, action.payload]
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
                invoices: updatedInvoices
            };

            // const updatedInvoice = {
            //     ...state.invoices[action.payload.index],
            //     ...action.payload.newInvoice
            // };

            // const updatedInvoices = [...state.invoices];
            // updatedInvoices[action.payload.index] = updatedInvoice;

            // return {
            //     ...state,
            //     invoices: updatedInvoices
            // };

        case InvoicesActions.DELETE_INVOICE:
            return {
                ...state,
                //invoices: []
                invoices: state.invoices.filter((invoice, index)=> {
                    return invoice.id !== action.payload;
                })
            };

        case InvoicesActions.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.payload
            };
        
        default:
            return state;        
    }
        
}