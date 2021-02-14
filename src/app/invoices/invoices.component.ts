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
  isLoading = false;      // Managed by NgRX
  error: string = null;   // Managed by NgRX

  flag: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  ngOnInit(): void {

    this.store.select('invoices').subscribe(incState => {
      this.flag = (!!incState.invoices) ? true : false; 
      this.error = incState.incError;
    });

    this.store.dispatch(new InvoiceActions.SetVisibility(this.flag) );
  }

  onHandleError() {
    this.store.dispatch(new InvoiceActions.ClearError());
  }

}
