import { Actions, Effect, ofType } from '@ngrx/effects';
import * as InvoicesActions from '../store/invoice.actions';
import { switchMap, map, withLatestFrom, tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Invoice } from '../invoice.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'
import { Invoice_add } from '../invoice_add.model';


@Injectable()
export class InvoiceEffects {
    invoice:Invoice;
    invoices:Invoice[];
    updated_invoices:Invoice[] = [];

    @Effect()
    fetchInvoices = this.actions$.pipe(
        ofType(InvoicesActions.FETCH_INVOICES),
        switchMap(() => {
            return this.http.get<Invoice[]>(environment.webAppEndPoint + '/invoices/list')
        }),
        map(invoices => {
            return invoices.map( invoice => {
                 return {...invoice};
            });
        }),
        tap(invoices => {
            localStorage.setItem('invoices', JSON.stringify(invoices));
        }),
        map(invoices => {
            return new InvoicesActions.SetInvoices(invoices);
        })
    ); 

    @Effect({dispatch: false})
    storeInvoices = this.actions$.pipe(
        ofType(InvoicesActions.STORE_INVOICE),
        withLatestFrom(
            this.store.select('invoices')
        ), // Add value from one Observable to another
        // actionData : is action from ofType()
        // invoicesState : is data from withLatestFrom
        switchMap(([actionData, invoicesState]) => {
            return this.http.put(
                environment.webAppEndPoint + '/invoices/add',
                invoicesState.invoices
                );
        })
    );

    @Effect({dispatch: false})
    addInvoice = this.actions$.pipe(
        ofType(InvoicesActions.ADD_INVOICE),
       
        switchMap((invoiceData: InvoicesActions.AddInvoice) => {

            console.log('add invoice');

            const headerDict = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
              }
            const requestOptions = {                                                                                                                                                                                 
                headers: new HttpHeaders(headerDict), 
              };

            return this.http.post(
                environment.webAppEndPoint + '/invoices/add' ,
                new Invoice_add(
                    invoiceData.payload.name,
                    invoiceData.payload.mobile_no,
                    invoiceData.payload.address,
                    invoiceData.payload.gst_no
                ), 
                
                requestOptions);
        }),
        switchMap(()=>{
            return this.http.get(environment.webAppEndPoint + '/invoices/list').pipe(
                tap((res: Invoice[]) =>{
                    // add invoice to cache
                    localStorage.setItem('invoices', JSON.stringify(res));
                    this.store.dispatch(new InvoicesActions.SetInvoices(res));
                } )
            );
        })
    );

    @Effect({dispatch: false})
    updateInvoice = this.actions$.pipe(
        ofType(InvoicesActions.UPDATE_INVOICE),
        switchMap((invoiceData: InvoicesActions.UpdateInvoice) => {
            //console.log(invoiceData.payload.newInvoice);

            this.invoices = JSON.parse(localStorage.getItem('invoices'));
            this.invoices.filter((invoice, index)=> {
                //return invoice.id !== invoiceData.payload.index;
                
                if(invoice.id === invoiceData.payload.newInvoice.id)
                    this.updated_invoices.push(invoiceData.payload.newInvoice);
                else 
                    this.updated_invoices.push(invoice);
            })
            localStorage.setItem('invoices', JSON.stringify(this.updated_invoices));

            const headerDict = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
              }
            const requestOptions = {                                                                                                                                                                                 
                headers: new HttpHeaders(headerDict), 
              };

            return this.http.put(
                environment.webAppEndPoint + '/invoices/update/' +  invoiceData.payload.newInvoice.id.toString(), 
                invoiceData.payload.newInvoice , 
                requestOptions)
                .pipe(
                    tap(response => {
                        //console.log("http tap in update");
                        //console.log(response);
                    }),
                    map(()=>{
                        //console.log("http map");
                        //return new InvoicesActions.AddInvoice(invoiceData.payload);
                    })
            );
        })
    );

    @Effect({dispatch: false})
    deleteInvoice = this.actions$.pipe(
        ofType(InvoicesActions.DELETE_INVOICE),
        //map( action => action.payload ),
        switchMap((payload: InvoicesActions.DeleteInvoice) => {

            this.invoices = JSON.parse(localStorage.getItem('invoices'));
            this.invoices = this.invoices.filter((invoice, index)=> {
                return invoice.id !== payload.payload;
            })
            localStorage.setItem('invoices', JSON.stringify(this.invoices));

            return this.http.delete(environment.webAppEndPoint + '/invoices/delete/' + payload.payload.toString() )
            .pipe(
                map(() => {
                            // return new InvoicesActions.SetInvoices(this.invoices);      
                        }
                    )
            );
        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
        ) {} 
}