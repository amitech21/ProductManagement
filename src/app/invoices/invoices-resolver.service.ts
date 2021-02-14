import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Invoice } from './invoice.model';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../invoices/store/invoice.actions'
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InvoicesResolverService implements Resolve<Invoice[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Invoice[] | import("rxjs").Observable<Invoice[]> | Promise<Invoice[]> {
        //const invoices_c: Invoice[] = JSON.parse(localStorage.getItem("invoices"));
        
        // if (invoices.length === 0) {
            //return this.dataStorageService.fetchInvoices();

            return this.store.select('invoices').pipe(
                take(1),
                map(invoicesState => {
                    return invoicesState.invoices;
                }),
                // switchMap(invoices => {
                //     if(invoices.length == 0){
                //         localStorage.removeItem("invoices");
                //         this.store.dispatch(new InvoiceActions.FetchInvoices() );
                //         return this.actions$.pipe(
                //             ofType(InvoiceActions.SET_INVOICES),  
                //             take(1)
                //         );
                        
                //     }else {
                //         return of(invoices); 
                //     }
                // })
            );

            

        // } else {
        //     return invoices;
        // }
    }

}