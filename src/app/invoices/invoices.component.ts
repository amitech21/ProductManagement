import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice.model';
import { Store } from '@ngrx/store';
import * as InvoiceActions from './store/invoice.actions'; 
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: []
})
export class InvoicesComponent implements OnInit {
  selectedInvoice: Invoice;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  flag: boolean;
  selectedItem = '2';

  ngOnInit(): void {
    this.flag = (localStorage.getItem('invoices_visibility') === "false" ) ? false : true; 

    if(!localStorage.getItem('invoices'))
      this.store.dispatch(new InvoiceActions.FetchInvoices() );

    this.store.dispatch(new InvoiceActions.SetVisibility(this.flag) );
  }

}
