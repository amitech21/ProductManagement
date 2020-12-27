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

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit(): void {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       this.recipe = this.recipeService.getInvoice(this.id);
    //     }
    //   );

    //this.store.dispatch(new InvoiceActions.SetVisibility(false));
    //localStorage.setItem('invoices_visibility', "false");
    //this.invoiceListComponent.invoicesVisibility = false;

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
          // return invoicesState.invoices.find((invoice, index) => {
          //   return index === this.id;
          // });
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
    //this.invoiceService.deleteInvoice(this.id);
    this.store.dispatch(new InvoiceActions.DeleteInvoice(this.invoice.id));
    //this.store.dispatch(new InvoiceActions.SetInvoices(JSON.parse(localStorage.getItem('invoices'))));
    this.router.navigate(['../'], {relativeTo: this.route });

  }

  onCancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route });
  }

}
