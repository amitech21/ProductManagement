import { Component, OnInit, OnDestroy, Injectable} from '@angular/core';

import { Invoice } from '../invoice.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as InvoiceActions from '../../invoices/store/invoice.actions';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit, OnDestroy {
subscription: Subscription;
pre_subscription: Subscription;
sub_fetchCount: Subscription;

isLoading = false;      // Managed by NgRX
error: string = null;   // Managed by NgRX

public invoicesVisibility: boolean = true;

page = 1;
count = 0;
tableSize = 4;

  invoices: Invoice[];
  // invoices: Invoice[] = [
  //   new Invoice('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/invoice-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Invoice('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/invoice-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  table_config: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new InvoiceActions.FetchInvoicesCount());    

    if(!!this.invoices)
    {
      this.sub_fetchCount = this.store.select('invoices').subscribe(incState => {
        this.count = incState.inc_total_count;
        this.invoices = incState.invoices;
        this.invoicesVisibility = incState.visibility;

        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: this.page,
          totalItems: this.count
        }

      });
    } else {
      this.store.dispatch(new InvoiceActions.FetchInvoicesByPg({
        pgNo: 0,
        item_count: 4
      }) );

      this.sub_fetchCount = this.store.select('invoices').subscribe(incState => {
        this.count = incState.inc_total_count;
        this.invoices = incState.invoices;
        this.invoicesVisibility = incState.visibility;

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
    this.invoicesVisibility = true;

    this.store.dispatch(new InvoiceActions.FetchInvoicesCount());
    this.store.dispatch(new InvoiceActions.FetchInvoicesByPg({
      pgNo: 0, item_count: this.tableSize
    }));

    this.sub_fetchCount = this.store.select('invoices').subscribe(invoicesState => {
      this.count = invoicesState.inc_total_count;
      this.invoices = invoicesState.invoices;
      this.invoicesVisibility = invoicesState.visibility;
      this.error = invoicesState.incError;
      this.isLoading = invoicesState.incLoading;
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
    this.invoicesVisibility = false;
    this.store.dispatch(new InvoiceActions.SetVisibility(false) );
  }

  onNew(){
    this.invoicesVisibility = false;
    this.store.dispatch(new InvoiceActions.SetVisibility(false) );
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
      new InvoiceActions.FetchInvoicesByPg({
      pgNo: event-1,
      item_count: this.tableSize
      })
    );

    this.store.select('invoices').subscribe(
      incState => {
        this.invoices = incState.invoices;
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
    this.store.dispatch(new InvoiceActions.ClearError());
  }

}
