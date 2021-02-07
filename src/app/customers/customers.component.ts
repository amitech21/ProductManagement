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
  isLoading = false;      // Managed by NgRX
  error: string = null;   // Managed by NgRX

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  flag: boolean;

  ngOnInit(): void {
    this.store.select('customers').subscribe(custState => {
      this.flag = (!!custState.customers) ? true : false; 
      this.error = custState.custError;
    });
    this.store.dispatch(new CustomerActions.SetVisibility(this.flag) );
  }

  onHandleError() {
    this.store.dispatch(new CustomerActions.ClearError());
  }

}
