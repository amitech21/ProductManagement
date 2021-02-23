import { Actions, Effect, ofType } from '@ngrx/effects';
import * as CustomersActions from '../store/customer.actions';
import { switchMap, map, withLatestFrom, tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../customer.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'
import { Customer_add } from '../customer_add.model';
import { of } from 'rxjs';


@Injectable()
export class CustomerEffects {
    customer:Customer;
    customers:Customer[];
    //updated_customers:Customer[] = [];

    @Effect({dispatch: true})
    fetchCustomers = this.actions$.pipe(
        ofType(CustomersActions.FETCH_CUSTOMERS),
        switchMap((paylod_data: CustomersActions.FetchCustomers) => {
            return this.http.get<Customer[]>(
                environment.webAppEndPoint + '/customers/list'               
            ).pipe(
                map((customers: Customer[]) => {                    
                    return new CustomersActions.SetCustomers(customers);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );

    @Effect({dispatch: true})
    fetchCustomersCount = this.actions$.pipe(
        ofType(CustomersActions.FETCH_CUSTOMERS_COUNT),
        switchMap(() => {
            return this.http.get<number>(environment.webAppEndPoint + '/customers/listCount')
            .pipe(
                map((count: number) => {
                    return new CustomersActions.SetCustomersCount(count);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        }),
    );

    @Effect({dispatch: true})
    fetchCustomersByPg = this.actions$.pipe(
        ofType(CustomersActions.FETCH_CUSTOMERS_BY_PAGE),
        switchMap((paylod_data: CustomersActions.FetchCustomersByPg) => {
            return this.http.get<Customer[]>(
                environment.webAppEndPoint + '/customers/listByPage/'
                + paylod_data.payload.pgNo
                + '/'
                + paylod_data.payload.item_count                
            ).pipe(
                map((customers: Customer[]) => {
                    return new CustomersActions.SetCustomers(customers);
                }),
                catchError((errorRes: HttpErrorResponse | any) => {
                    return handleError(errorRes);
                })
            );
        })
    );

    @Effect({dispatch: true})
    addCustomer = this.actions$.pipe(
        ofType(CustomersActions.ADD_CUSTOMER),
       
        switchMap((customerData: CustomersActions.AddCustomer) => {

            const headerDict = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
              }
            const requestOptions = {                                                                                                                                                                                 
                headers: new HttpHeaders(headerDict), 
              };

            return this.http.post(
                environment.webAppEndPoint + '/customers/add' ,
                new Customer_add(
                    customerData.payload.name,
                    customerData.payload.mobile_no,
                    customerData.payload.address,
                    customerData.payload.gst_no
                ), 
                
                requestOptions).pipe(
                    map(() =>{
                        return new CustomersActions.SetCustomers(this.customers);
                    } ),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
                );
        })
    );

    @Effect({dispatch: true})
    updateCustomer = this.actions$.pipe(
        ofType(CustomersActions.UPDATE_CUSTOMER),
        switchMap((customerData: CustomersActions.UpdateCustomer) => {

            this.store.select('customers').subscribe(custState => {
                this.customers = custState.customers;
                // custState.customers.filter((customer, index)=> {
                //     if(customer.id === customerData.payload.newCustomer.id)
                //         this.updated_customers.push(customerData.payload.newCustomer);
                //     else 
                //         this.updated_customers.push(customer);
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
                environment.webAppEndPoint + '/customers/update/' +  customerData.payload.newCustomer.id, 
                customerData.payload.newCustomer , 
                requestOptions)
                .pipe(
                    map(() => {
                        return new CustomersActions.SetCustomers(this.customers);
                    }),
                    catchError((errorRes: HttpErrorResponse | any) => {
                        return handleError(errorRes);
                    })
            );
        })
    );

    @Effect({dispatch: true})
    deleteCustomer = this.actions$.pipe(
        ofType(CustomersActions.DELETE_CUSTOMER),
        switchMap((payload: CustomersActions.DeleteCustomer) => {

            this.store.select('customers').subscribe(custState => {
                this.customers = custState.customers;
                custState.customers.filter((customer, index)=> {
                    return customer.id !== payload.payload;
                })
            });

            return this.http.delete(environment.webAppEndPoint + '/customers/delete/' + payload.payload.toString() )
            .pipe(
                map(() => {
                    return new CustomersActions.SetCustomers(this.customers);
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
                    return of(new CustomersActions.CustomerFail("Connection refused from API server"));
                else if(!errorRes)
                    return of(new CustomersActions.CustomerFail(errorMessage));
                else if(!errorRes.error)
                    return of(new CustomersActions.CustomerFail(errorRes));
                else if(!errorRes.error.error)
                    return of(new CustomersActions.CustomerFail(errorRes.error));
                else if(!errorRes.error.error.message)
                    return of(new CustomersActions.CustomerFail(errorRes.error.error));

                    // of() to create new Observable
                    return of(new CustomersActions.CustomerFail(errorRes.error.error.message));
};