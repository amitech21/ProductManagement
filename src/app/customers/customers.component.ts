import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.model';
import { Store } from '@ngrx/store';
import * as CustomerActions from './store/customer.actions'; 
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: []
})
export class CustomersComponent implements OnInit {
  selectedCustomer: Customer;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  flag: boolean;

  ngOnInit(): void {
    this.flag = (localStorage.getItem('customers_visibility') === "false" ) ? false : true; 

    if(!localStorage.getItem('customers'))
      this.store.dispatch(new CustomerActions.FetchCustomers() );

    this.store.dispatch(new CustomerActions.SetVisibility(this.flag) );
  }

}
