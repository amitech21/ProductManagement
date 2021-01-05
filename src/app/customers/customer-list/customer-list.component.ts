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

public customersVisibility: boolean = true;

page = 1;
count = 0;
tableSize = 4;

  customers: Customer[];
  // customers: Customer[] = [
  //   new Customer('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/customer-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Customer('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/customer-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {


    this.store.dispatch(new CustomerActions.FetchCustomersCount());
    this.sub_fetchCount = this.store.select('customers').subscribe(customersState => {
      this.count = customersState.cust_total_count;
    });

    this.customers = JSON.parse(localStorage.getItem('customers'));
    //console.log(JSON.parse(localStorage.getItem('customers')));
    //this.store.dispatch(new CustomerActions.SetCustomers(this.customers));
    this.customersVisibility = JSON.parse(localStorage.getItem('customers_visibility'));
    

    // this.subscription = this.customerService.customersChanged.subscribe(
    this.subscription = this.store
    .select('customers')
    .pipe
    (map(customersState => {
      //this.customersVisibility = customersState.visibility;
      return customersState;
    }),
    map(customersState => customersState.customers))
    .subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
        //console.log(this.customers);
      }
    );

    this.customersVisibility = false;
    //this.customers = this.customerService.getCustomers();
    
  }

  onShow(){
    
    // this.store.dispatch(new CustomerActions.FetchCustomers() );
    // this.store.dispatch(new CustomerActions.SetVisibility(true) );
    this.customersVisibility = true;
    localStorage.setItem('customers_visibility', "true");
    this.customers = JSON.parse(localStorage.getItem('customers'));

    //this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  onHide(){
    localStorage.setItem('customers_visibility', "false");
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
    this.store.dispatch(new CustomerActions.FetchCustomersByPg({
      pgNo: event-1,
      item_count: this.tableSize
    }));

    //this.fetchPosts();
  } 

  // onTableSizeChange(event): void {
  //   console.log('onTableSizeChange called !!');
  //   //this.tableSize = event.target.value;
  //   //this.page = 1;
  //   //this.fetchPosts();
  // }

}
