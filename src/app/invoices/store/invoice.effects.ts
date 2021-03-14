import { Actions, Effect, ofType } from '@ngrx/effects';
import * as InvoicesActions from '../store/invoice.actions';
import { switchMap, map, withLatestFrom, tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../invoice.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'
import { Customer } from 'src/app/customers/customer.model';
import { of } from 'rxjs';


@Injectable()
export class InvoiceEffects {
    invoice:Invoice;
    invoices:Invoice[];
    //updated_invoices:Invoice[] = [];

    @Effect({dispatch: true})
    fetchInvoicesCount = this.actions$.pipe(
        ofType(InvoicesActions.FETCH_INVOICES_COUNT),
        switchMap((paylod_data: InvoicesActions.FetchInvoicesCount) => {
            if(paylod_data.payload === "" || paylod_data.payload === null){
                return this.http.get<number>(environment.webAppEndPoint + '/invoices/listCount')
                .pipe(
                    map((count: number) => {
                        return new InvoicesActions.SetInvoicesCount(count);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
            }else{
                return this.http.get<number>(environment.webAppEndPoint + '/invoices/listByCustNameCount/'+paylod_data.payload)
                .pipe(
                    map((count: number) => {
                        return new InvoicesActions.SetInvoicesCount(count);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
            }
        }),
    );

    @Effect({dispatch: true})
    fetchInvoicesByPg = this.actions$.pipe(
        ofType(InvoicesActions.FETCH_INVOICES_BY_PAGE),
        switchMap((paylod_data: InvoicesActions.FetchInvoicesByPg) => {
            return this.http.get<Invoice[]>(
                environment.webAppEndPoint + '/invoices/listByPage/'
                + paylod_data.payload.pgNo
                + '/'
                + paylod_data.payload.item_count                
            ).pipe(
                map((invoices: Invoice[]) => {
                    return new InvoicesActions.SetInvoices(invoices);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );

    @Effect({dispatch: true})
    fetchInvoicesByName = this.actions$.pipe(
        ofType(InvoicesActions.FETCH_INVOICES_BY_NAME),
        switchMap((paylod_data: InvoicesActions.FetchInvoicesByName) => {
            return this.http.get<Invoice[]>(
                environment.webAppEndPoint + '/invoices/listByCustName/'
                + paylod_data.payload.cust_name
                + '/'
                + paylod_data.payload.pgNo
                + '/'
                + paylod_data.payload.item_count           
            ).pipe(
                map((invoices: Invoice[]) => {
                    return new InvoicesActions.SetInvoices(invoices);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );
    
    // @Effect({dispatch: true})
    // fetchInvoices = this.actions$.pipe(
    //     ofType(InvoicesActions.FETCH_INVOICES),
    //     switchMap(() => {
    //         return this.http.get<Invoice[]>(environment.webAppEndPoint + '/invoices/list')
    //     }),
    //     map(invoices => {
    //         return invoices.map( invoice => {
    //              return {...invoice};
    //         });
    //     }),
    //     tap(invoices => {
    //         localStorage.setItem('invoices', JSON.stringify(invoices));
    //     }),
    //     map(invoices => {
    //         return new InvoicesActions.SetInvoices(invoices);
    //     })
    // ); 

    // @Effect({dispatch: false})
    // storeInvoices = this.actions$.pipe(
    //     ofType(InvoicesActions.STORE_INVOICE),
    //     withLatestFrom(
    //         this.store.select('invoices')
    //     ), // Add value from one Observable to another
    //     // actionData : is action from ofType()
    //     // invoicesState : is data from withLatestFrom
    //     switchMap(([actionData, invoicesState]) => {
    //         return this.http.put(
    //             environment.webAppEndPoint + '/invoices/add',
    //             invoicesState.invoices
    //             );
    //     })
    // );

    @Effect({dispatch: true})
    addInvoice = this.actions$.pipe(
        ofType(InvoicesActions.ADD_INVOICE),
       
        switchMap((invoiceData: InvoicesActions.AddInvoice) => {
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
                new Invoice(
                    0,
                    "",
                    "",
                    invoiceData.payload.invoice_date,
                    invoiceData.payload.customer,
                    invoiceData.payload.products,
                    invoiceData.payload.cgst,
                    invoiceData.payload.sgst,
                    invoiceData.payload.igst,
                    invoiceData.payload.discount,
                    invoiceData.payload.total_price

                ), 
                
                requestOptions).pipe(
                    map(() => {
                        return new InvoicesActions.SetInvoices(this.invoices);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect({dispatch: true})
    updateInvoice = this.actions$.pipe(
        ofType(InvoicesActions.UPDATE_INVOICE),
        switchMap((invoiceData: InvoicesActions.UpdateInvoice) => {

            this.store.select('invoices').subscribe(incState => {
                this.invoices = incState.invoices;
                // incState.invoices.filter((invoice, index)=> {
                //     if(invoice.id === invoiceData.payload.newInvoice.id)
                //         this.updated_invoices.push(invoiceData.payload.newInvoice);
                //     else 
                //         this.updated_invoices.push(invoice);
                // })
            });

            const headerDict = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
              }
            const requestOptions = {                                                                                                                                                                                 
                headers: new HttpHeaders(headerDict), 
              };

            return this.http.put(
                environment.webAppEndPoint + '/invoices/update/' +  invoiceData.payload.newInvoice.id, 
                invoiceData.payload.newInvoice , 
                requestOptions)
                .pipe(
                    map((updated_invoice: Invoice) => {
                        return new InvoicesActions.SetInvoices(this.invoices);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
            })
    );

    @Effect({dispatch: true})
    deleteInvoice = this.actions$.pipe(
        ofType(InvoicesActions.DELETE_INVOICE),
        switchMap((payload: InvoicesActions.DeleteInvoice) => {

            this.store.select('invoices').subscribe(incState => {
                this.invoices = incState.invoices;
                incState.invoices.filter((invoice, index)=> {
                    return invoice.id !== payload.payload;
                })
            });

            return this.http.delete(environment.webAppEndPoint + '/invoices/delete/' + payload.payload.toString() )
            .pipe(
                map(() => {
                    return new InvoicesActions.SetInvoices(this.invoices);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );


    @Effect()
    fetchCustomersByName = this.actions$.pipe(
        ofType(InvoicesActions.FETCH_CUSTOMERS_BY_NAME),
        switchMap((cust_name_data: string) => {
            return this.http.get<Customer[]>(environment.webAppEndPoint + '/customers/listByName/' + cust_name_data.toString);
        }),
        map(customers => {
            return customers;
        })
    );

    @Effect({dispatch: true})
    printInvoice = this.actions$.pipe(
        ofType(InvoicesActions.PRINT_INVOICE),
        switchMap((payload: InvoicesActions.PrintInvoice) => {

            return this.http.get(environment.webAppEndPoint + '/invoices/print/' + payload.payload.toString() )
            .pipe(
                map(() => {
                    return new InvoicesActions.LoadingDone();
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
        ) {}
         
}

const handleError = (errorRes: HttpErrorResponse | any) => {

    let errorMessage = "Unknown error occured !!!!";

                if(errorRes.status == 0)
                    return of(new InvoicesActions.InvoiceFail("Connection refused from API server"));
                else if(!errorRes)
                    return of(new InvoicesActions.InvoiceFail(errorMessage));
                else if(!errorRes.error)
                    return of(new InvoicesActions.InvoiceFail(errorRes));
                else if(!errorRes.error.error)
                    return of(new InvoicesActions.InvoiceFail(errorRes.error));
                else if(!errorRes.error.error.message)
                    return of(new InvoicesActions.InvoiceFail(errorRes.error.error));

                    // of() to create new Observable
                    return of(new InvoicesActions.InvoiceFail(errorRes.error.error.message));
};