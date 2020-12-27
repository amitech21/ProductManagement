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

public invoicesVisibility: boolean = true;

  invoices: Invoice[];
  // invoices: Invoice[] = [
  //   new Invoice('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/invoice-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Invoice('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/invoice-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.invoices = JSON.parse(localStorage.getItem('invoices'));
    //console.log(JSON.parse(localStorage.getItem('invoices')));
    //this.store.dispatch(new InvoiceActions.SetInvoices(this.invoices));
    this.invoicesVisibility = JSON.parse(localStorage.getItem('invoices_visibility'));
    

    // this.subscription = this.invoiceService.invoicesChanged.subscribe(
    this.subscription = this.store
    .select('invoices')
    .pipe
    (map(invoicesState => {
      //this.invoicesVisibility = invoicesState.visibility;
      return invoicesState;
    }),
    map(invoicesState => invoicesState.invoices))
    .subscribe(
      (invoices: Invoice[]) => {
        this.invoices = invoices;
        //console.log(this.invoices);
      }
    );

    //this.invoices = this.invoiceService.getInvoices();
    
  }

  onShow(){
    
    // this.store.dispatch(new InvoiceActions.FetchInvoices() );
    // this.store.dispatch(new InvoiceActions.SetVisibility(true) );
    this.invoicesVisibility = true;
    localStorage.setItem('invoices_visibility', "true");
    this.invoices = JSON.parse(localStorage.getItem('invoices'));

    //this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  onHide(){
    localStorage.setItem('invoices_visibility', "false");
    this.invoicesVisibility = false;
    this.store.dispatch(new InvoiceActions.SetVisibility(false) );
  }

  onNew(){
    this.invoicesVisibility = false;
    this.store.dispatch(new InvoiceActions.SetVisibility(false) );
    this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}
