import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from './customer.model';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';
import * as CustomerActions from '../customers/store/customer.actions'
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CustomersResolverService implements Resolve<Customer[]> {

    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
    ) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer[] | import("rxjs").Observable<Customer[]> | Promise<Customer[]> {
        //const customers_c: Customer[] = JSON.parse(localStorage.getItem("customers"));
        
        // if (customers.length === 0) {
            //return this.dataStorageService.fetchCustomers();

            return this.store.select('customers').pipe(
                take(1),
                map(customersState => {
                    return customersState.customers;
                }),
                switchMap(customers => {
                    if(customers.length == 0){
                        localStorage.removeItem("customers");
                        this.store.dispatch(new CustomerActions.FetchCustomers() );
                        return this.actions$.pipe(
                            ofType(CustomerActions.SET_CUSTOMERS),  
                            take(1)
                        );
                        
                    }else {
                        return of(customers); 
                    }
                })
            );

            

        // } else {
        //     return customers;
        // }
    }

}