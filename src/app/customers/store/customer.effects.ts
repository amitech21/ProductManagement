import { Actions, Effect, ofType } from '@ngrx/effects';
import * as CustomersActions from '../store/customer.actions';
import { switchMap, map, withLatestFrom, tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../customer.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { environment } from '../../../environments/environment'
import { Customer_add } from '../customer_add.model';


@Injectable()
export class CustomerEffects {
    customer:Customer;
    customers:Customer[];
    updated_customers:Customer[] = [];

    // @Effect()
    // fetchCustomers = this.actions$.pipe(
    //     ofType(CustomersActions.FETCH_CUSTOMERS),
    //     switchMap(() => {
    //         return this.http.get<Customer[]>(environment.webAppEndPoint + '/customers/list')
    //     }),
    //     map(customers => {
    //         return customers.map( customer => {
    //              return {...customer};
    //         });
    //     }),
    //     tap(customers => {
    //         localStorage.setItem('customers', JSON.stringify(customers));
    //     }),
    //     map(customers => {
    //         return new CustomersActions.SetCustomers(customers);
    //     })
    // );

    @Effect({dispatch: false})
    @Effect()
    fetchCustomersCount = this.actions$.pipe(
        ofType(CustomersActions.FETCH_CUSTOMERS_COUNT),
        switchMap(() => {
            return this.http.get<number>(environment.webAppEndPoint + '/customers/listCount')
        }),
        map((count: number) => {
            return new CustomersActions.SetCustomersCount(count);
        })
    );

    @Effect()
    fetchCustomersByPg = this.actions$.pipe(
        ofType(CustomersActions.FETCH_CUSTOMERS_BY_PAGE),
        switchMap((paylod_data: CustomersActions.FetchCustomersByPg) => {
            return this.http.get<Customer[]>(
                environment.webAppEndPoint + '/customers/listByPage/'
                + paylod_data.payload.pgNo
                + '/'
                + paylod_data.payload.item_count                
            )
        }),
        map(customers => {
            return customers.map( customer => {
                 return {...customer};
            });
        }),
        tap(customers => {
            localStorage.setItem('customers', JSON.stringify(customers));
        }),
        map(customers => {
            return new CustomersActions.SetCustomers(customers);
        })
    );


    @Effect({dispatch: false})
    storeCustomers = this.actions$.pipe(
        ofType(CustomersActions.STORE_CUSTOMER),
        withLatestFrom(
            this.store.select('customers')
        ), // Add value from one Observable to another
        // actionData : is action from ofType()
        // customersState : is data from withLatestFrom
        switchMap(([actionData, customersState]) => {
            return this.http.put(
                environment.webAppEndPoint + '/customers/add',
                customersState.customers
                );
        })
    );

    @Effect({dispatch: false})
    addCustomer = this.actions$.pipe(
        ofType(CustomersActions.ADD_CUSTOMER),
       
        switchMap((customerData: CustomersActions.AddCustomer) => {

            console.log('add customer');

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
                
                requestOptions);
        }),
        switchMap(()=>{
            return this.http.get(environment.webAppEndPoint + '/customers/listByPage/0/4').pipe(
                tap((res: Customer[]) =>{
                    // add customer to cache
                    localStorage.setItem('customers', JSON.stringify(res));
                    this.store.dispatch(new CustomersActions.SetCustomers(res));
                } )
            );
        })
    );

    @Effect({dispatch: false})
    updateCustomer = this.actions$.pipe(
        ofType(CustomersActions.UPDATE_CUSTOMER),
        switchMap((customerData: CustomersActions.UpdateCustomer) => {
            //console.log(customerData.payload.newCustomer);

            this.customers = JSON.parse(localStorage.getItem('customers'));
            this.customers.filter((customer, index)=> {
                //return customer.id !== customerData.payload.index;
                
                if(customer.id === customerData.payload.newCustomer.id)
                    this.updated_customers.push(customerData.payload.newCustomer);
                else 
                    this.updated_customers.push(customer);
            })
            localStorage.setItem('customers', JSON.stringify(this.updated_customers));

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
                    tap(response => {
                        //console.log("http tap in update");
                        //console.log(response);
                    }),
                    map(()=>{
                        //console.log("http map");
                        //return new CustomersActions.AddCustomer(customerData.payload);
                    })
            );
        })
    );

    @Effect({dispatch: false})
    deleteCustomer = this.actions$.pipe(
        ofType(CustomersActions.DELETE_CUSTOMER),
        //map( action => action.payload ),
        switchMap((payload: CustomersActions.DeleteCustomer) => {

            this.customers = JSON.parse(localStorage.getItem('customers'));
            this.customers = this.customers.filter((customer, index)=> {
                return customer.id !== payload.payload;
            })
            localStorage.setItem('customers', JSON.stringify(this.customers));

            return this.http.delete(environment.webAppEndPoint + '/customers/delete/' + payload.payload )
            .pipe(
                map(() => {
                            // return new CustomersActions.SetCustomers(this.customers);      
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