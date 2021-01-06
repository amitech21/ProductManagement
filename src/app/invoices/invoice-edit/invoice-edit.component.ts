import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, debounceTime, distinctUntilChanged, tap, delay } from 'rxjs/operators';
import * as InvoiceActions from '../store/invoice.actions'; 
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customers/customer.model';
import { Product } from 'src/app/products/product.model';
import { InvoiceService } from '../invoice.service'
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

@Component({ 
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  private id: number;
  private editMode: boolean = false;
  invoiceForm: FormGroup;

  source: LocalDataSource; // add a property to the component
  // data = [
  //   // ... our data here
  // ];

  // ############# customer's details #############
  cust_name_control = new FormControl('');

  selectedCustId:number;
  selectedCustId_flag = false;
  private selectedCust:Customer;
  cust_name_filter: string;
  customers:Customer[];
  
  cust_id = new FormControl('');
  cust_name = new FormControl('');
  cust_mobile_no = new FormControl('');
  cust_address = new FormControl('');
  cust_gst_no = new FormControl('');

  // ############# product's details #############
  prod_name_control = new FormControl('');

  selectedProdId:number;
  selectedProdId_flag = false;
  private selectedProd:Product;
  prod_name_filter: string;
  products:Product[];
  
  prod_id = new FormControl('');
  prod_name = new FormControl('');
  prod_description = new FormControl('');
  prod_imagePath = new FormControl('');
  prod_price = new FormControl('');

  // ############# product's list #############
  products_to_sell:Product[] = [];

  private storeSub: Subscription;
  private sub_custControl: Subscription;
  private sub_custName: Subscription;
  private sub_selectedCust: Subscription;
  private sub_prodControl: Subscription;
  private sub_prodName: Subscription;
  private sub_selectedProd: Subscription;


  constructor(
    private route:ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private invoiceService: InvoiceService,
    private http: HttpClient,
    private ref: ChangeDetectorRef
    ) { 

      // this.source = new LocalDataSource(this.customers); // create the source

      // ############# Customer's Control #############
      this.sub_custControl = this.cust_name_control.valueChanges
      .pipe(
        debounceTime(1000), // Waiting for 1.5 sec while you are typing
        distinctUntilChanged() // Prevents the emitting if the 'start' value and the 'end' value are the same
      )
      .subscribe(value => {
        this.sub_custName = this.invoiceService.getCustomersByName(value).pipe(
          //delay( 2000 ) // Waiting for response
        ).subscribe(
          (data:Customer[] ) => {
            this.customers = data;
            this.ref.detectChanges();
          }
        );
        // TODO: call BE here with this.httpClient...
      });

      // ############# Product's Control #############
      this.sub_prodControl = this.prod_name_control.valueChanges
      .pipe(
        debounceTime(1000), // Waiting for 1.5 sec while you are typing
        distinctUntilChanged() // Prevents the emitting if the 'start' value and the 'end' value are the same
      )
      .subscribe(value => {
        this.sub_prodName = this.invoiceService.getProductsByName(value).pipe(
          //delay( 2000 ) // Waiting for response
        ).subscribe(
          (data:Product[] ) => {
            this.products = data;
            this.ref.detectChanges();
          }
        );
        // TODO: call BE here with this.httpClient...
      });

    }

  ngOnDestroy(){
    if(this.storeSub)
      this.storeSub.unsubscribe();

    if(this.sub_custControl)
      this.sub_custControl.unsubscribe();

    if(this.sub_custName)
      this.sub_custName.unsubscribe();

    if(this.sub_selectedCust)
      this.sub_selectedCust.unsubscribe();

    if(this.sub_prodControl)
      this.sub_prodControl.unsubscribe();

    if(this.sub_prodName)
      this.sub_prodName.unsubscribe();

    if(this.sub_selectedProd)
      this.sub_selectedProd.unsubscribe();

  }

  ngOnInit(): void {

    this.sub_custName = this.invoiceService.getCustomersByName("a").pipe(
      //delay( 2000 ) // Waiting for response
    ).subscribe(
      (data:Customer[] ) => {
        this.customers = data;
        this.source = new LocalDataSource(data); // create the source
//        this.ref.detectChanges();
      }
    );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initForm();
        }
      );
  }

  onSubmit() {

    if(this.editMode)
    {
      this.store.dispatch(new InvoiceActions.UpdateInvoice({
        index: this.id,
        newInvoice: this.invoiceForm.value
      }));
    }
    else{
        console.log('in cus edit');
      this.store.dispatch(new InvoiceActions.AddInvoice(this.invoiceForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route });
  }

 
  onCancel() {   
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  // get controls() { // a getter!
  //   return (<FormArray>this.invoiceForm.get('ingredients')).controls;
  // }

  private initForm(){
    let invoiceId = 0;
    let invoiceName = '';
    let invoiceMobileNo = 0;
    let invoiceAddress = '';
    let invoiceGstNo= 0;
    let cust_name= '';

    if(this.editMode){
      //const invoice = this.invoiceService.getInvoice(this.id);

      this.storeSub = this.store.select('invoices')
      .pipe(map(invoicesState => {
        return invoicesState.invoices.find((invoice, index) => {
          return invoice.id === this.id;
          //return invoice.id === this.id;
        });
      }))
      .subscribe(invoice => {
          invoiceId = invoice.id;
          invoiceName = invoice.name;
          invoiceMobileNo = invoice.mobile_no;
          invoiceAddress = invoice.address;
          invoiceGstNo = invoice.gst_no;
      });

      
    }

    this.invoiceForm = new FormGroup({
      'id' : new FormControl(invoiceId),
      'name' : new FormControl(invoiceName, Validators.required),
      'mobile_no' : new FormControl(invoiceMobileNo, Validators.required),
      'address' : new FormControl(invoiceAddress, Validators.required),
      'gst_no' : new FormControl(invoiceGstNo, Validators.required),
    });

  }

  // ########### customers #############
  selectCustId(data:number){
    this.selectedCustId_flag=true;
    this.sub_selectedCust = this.invoiceService.getCustomersById(data).subscribe((data: Customer) => {
      this.selectedCust = data;

      this.cust_name_control.setValue(this.selectedCust.name + " with ID: " + +this.selectedCust.id);

      this.cust_id.setValue(this.selectedCust.id);
      this.cust_name.setValue(this.selectedCust.name);
      this.cust_mobile_no.setValue(this.selectedCust.mobile_no);
      this.cust_address.setValue(this.selectedCust.address);
      this.cust_gst_no.setValue(this.selectedCust.gst_no);
    });
  }

  onSelectCustBtn(){
      console.log('onSelectCustBtn');
      console.log(this.cust_id.value);
      
      this.customers = [];
      this.selectedCustId_flag = false;
  }

    // ########### products #############
    selectProdId(data:number){
      this.selectedProdId_flag=true;
      this.sub_selectedProd = this.invoiceService.getProductsById(data).subscribe((data: Product) => {
        this.selectedProd = data;
  
        this.prod_name_control.setValue(this.selectedProd.name + " with ID: " + +this.selectedProd.id);
  
        this.prod_id.setValue(this.selectedProd.id);
        this.prod_name.setValue(this.selectedProd.name);
        this.prod_description.setValue(this.selectedProd.description);
        this.prod_imagePath.setValue(this.selectedProd.imagePath);
        this.prod_price.setValue(this.selectedProd.price);
  
        //this.customers = [];
      });
    }
  
    onSelectProdBtn(){
        this.products_to_sell.push(this.selectedProd);
        console.log('onSelectProdBtn');
        console.log(this.selectedProd.id);

        this.products = [];
        this.selectedProdId_flag = false;
    }

    onSearch(query: string = '') {
      console.log(query);
      this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'id',
          search: query
        },
        {
          field: 'name',
          search: query
        },
        {
          field: 'mobile_no',
          search: query
        },
        {
          field: 'address',
          search: query
        },
        {
          field: 'gst_no',
          search: query
        }
      ], false); 
      // second parameter specifying whether to perform 'AND' or 'OR' search 
      // (meaning all columns should contain search query or at least one)
      // 'AND' by default, so changing to 'OR' by setting false here
    }

    settings = {
      actions: false,
      columns: {
        id: {
          title: 'ID',
          filter: true
        },
        name: {
          title: 'Full Name',
          filter: true
        },
        mobile_no: {
          title: 'Mobile No',
          filter: true
        },
        address: {
          title: 'Address',
          filter: true
        },
        gst_no: {
          title: 'GST No',
          filter: true
        }
      }
    };

}
