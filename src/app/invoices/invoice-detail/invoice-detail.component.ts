import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../invoice.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as InvoiceActions from '../store/invoice.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Customer } from 'src/app/customers/customer.model';
import { ProductInvoice } from 'src/app/products/products_invoice.model';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  public invoice: Invoice;
  id: number;
  error: string = null;   // Managed by NgRX

  public customers: Customer[] = [];
  public products: ProductInvoice[] = [];
  public invoiceForm: FormGroup;
  public cust_source = new LocalDataSource(this.customers); // create the source
  public prod_source = new LocalDataSource(this.products); // create the source

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit(): void {

    this.initForm();

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
        this.invoiceForm.get('cDate').setValue(invoice[0].created_date_time);
        this.invoiceForm.get('uDate').setValue(invoice[0].updated_date_time);
        this.invoiceForm.get('total_gst').setValue(invoice[0].gst);
        this.invoiceForm.get('total_discount').setValue(invoice[0].discount);
        this.invoiceForm.get('total_price').setValue(invoice[0].total_price);

        this.customers[0] = invoice[0].customer;
        this.cust_source.load(this.customers);
        this.prod_source.load(invoice[0].products);

        window.scroll(0,0);
      });

      this.store.select('invoices').subscribe(incState => {
        this.error = incState.incError;
      });
  }

  onPrintInvoice() {
    this.store.dispatch(new InvoiceActions.PrintInvoice(this.id));
    // this.ngOnInit();
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

  onSubmit(){

  }

  initForm(){
    // let invoiceId = 0;
    let invoiceCDate = "";
    let invoiceUDate = "";
    // let invoiceProducts_price = 0;
    let invoiceTotal_gst = 0;
    let invoiceTotal_discount = 0;
    let invoiceTotal_price = 0;

    this.invoiceForm = new FormGroup({
      // 'id' : new FormControl(invoiceId),
      'cDate' : new FormControl(invoiceCDate),
      'uDate' : new FormControl(invoiceUDate),
      // 'products_price' : new FormControl(invoiceProducts_price),
      'total_gst' : new FormControl(invoiceTotal_gst),
      'total_discount' : new FormControl(invoiceTotal_discount),
      'total_price' : new FormControl(invoiceTotal_price)

    });
  }

  cust_newSettings = { 
    actions: false,
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      name: {
        title: 'Full Name',
        filter: false
      },
      mobile_no: {
        title: 'Mobile No',
        filter: false
      },
      address: {
        title: 'Address',
        filter: false
      },
      gst_no: {
        title: 'GST No',
        filter: false
      }
    }
   }

   prod_newSettings = { 
    actions: false,
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      name: {
        title: 'Product Name',
        filter: false
      },
      description: {
        title: 'Description',
        filter: false
      },
      price: {
        title: 'Price',
        filter: false
      },
      quantity: {
        title: 'Quantity',
        filter: false
      }
    }
   }

}
