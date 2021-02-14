import { Component, OnInit, OnDestroy, Injectable} from '@angular/core';

import { Customer } from '../customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as CustomerActions from '../../customers/store/customer.actions';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
subscription: Subscription;
pre_subscription: Subscription;
sub_fetchCount: Subscription;

isLoading = false;      // Managed by NgRX
error: string = null;   // Managed by NgRX

public customersVisibility: boolean = true;

page = 1;
count = 0;
tableSize = 4;

  customers: Customer[];
  // customers: Customer[] = [
  //   new Customer('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/customer-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Customer('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/customer-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  table_config: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new CustomerActions.FetchCustomersCount());

    if(!!this.customers)
    {
      this.sub_fetchCount = this.store.select('customers').subscribe(customersState => {
        this.count = customersState.cust_total_count;
        this.customers = customersState.customers;
        this.customersVisibility = customersState.visibility;

        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: this.page,
          totalItems: this.count
        }

      });
    } else {
      this.store.dispatch(new CustomerActions.FetchCustomersByPg({
        pgNo: 0,
        item_count: 4
      }) );

      this.sub_fetchCount = this.store.select('customers').subscribe(customersState => {
        this.count = customersState.cust_total_count;
        this.customers = customersState.customers;
        this.customersVisibility = customersState.visibility;

        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: this.page,
          totalItems: this.count
        }

      });
    }
  }

  onShow(){
    
    this.customersVisibility = true;
    
    this.store.dispatch(new CustomerActions.FetchCustomersCount());
    this.store.dispatch(new CustomerActions.FetchCustomersByPg({
      pgNo: 0, item_count: this.tableSize
    }));

    this.sub_fetchCount = this.store.select('customers').subscribe(custState => {
      this.count = custState.cust_total_count;
      this.customers = custState.customers;
      this.customersVisibility = custState.visibility;
      this.error = custState.custError;
      this.isLoading = custState.custLoading;
    });
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onHide(){
    this.customersVisibility = false;
    this.store.dispatch(new CustomerActions.SetVisibility(false) );
  }

  onNew(){
    this.customersVisibility = false;
    this.store.dispatch(new CustomerActions.SetVisibility(false) );
    this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  ngOnDestroy() {
    if(!!this.subscription)
      this.subscription.unsubscribe();

    if(!!this.pre_subscription)
      this.pre_subscription.unsubscribe();

    if(!!this.sub_fetchCount)
      this.sub_fetchCount.unsubscribe();
  }

  onTableDataChange(event){
    console.log(event);
    this.store.dispatch(
      new CustomerActions.FetchCustomersByPg({
      pgNo: event-1,
      item_count: this.tableSize
      })
    );

    this.store.select('customers').subscribe(
      custState => {
        this.customers = custState.customers;
        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: event,
          totalItems: this.count
        }
      }
    );
  } 

  onHandleError() {
    this.store.dispatch(new CustomerActions.ClearError());
  }

}
