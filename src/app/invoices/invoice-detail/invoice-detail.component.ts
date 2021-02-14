import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../invoice.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as InvoiceActions from '../store/invoice.actions';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice: Invoice;
  id: number;
  error: string = null;   // Managed by NgRX

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit(): void {

    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('invoices');
        }),
        map(invoicesState => {

          return invoicesState.invoices.filter((invoice, index)=> {
            if(this.id === invoice.id)
              {
                return invoice; 
              }           
          });
        })
      )
      .subscribe(invoice =>{
        this.invoice = invoice[0];
        window.scroll(0,0);
      });

      this.store.select('invoices').subscribe(incState => {
        this.error = incState.incError;
      });
  }

  onAddToShoppingList() {
    //this.invoiceService.addIngredientsToShoppingList(this.invoice.ingredients);
    // this.store.dispatch(
    //   new ShoppingListActions.AddIngredients(this.invoice.ingredients)
    // );
  }

  onEditInvoice(){
    this.router.navigate(['edit'] , {relativeTo: this.route});
    //this.router.navigate(['../' , this.id , 'edit'] , {relativeTo: this.route});
    
  }

  onDeleteInvoice(){
    this.store.dispatch(new InvoiceActions.DeleteInvoice(this.invoice.id));
    this.store.select('invoices').subscribe(incState => {
      this.error = incState.incError;
    });    
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  onCancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  onHandleError() {
    this.store.dispatch(new InvoiceActions.ClearError());
  }

}
