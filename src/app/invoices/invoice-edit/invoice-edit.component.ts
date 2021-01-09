import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map} from 'rxjs/operators';
import * as InvoiceActions from '../store/invoice.actions'; 
import * as CustomerActions from '../../customers/store/customer.actions'; 
import * as ProductActions from '../../products/store/product.actions'; 
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customers/customer.model';
import { Product } from 'src/app/products/product.model';
import { InvoiceService } from '../invoice.service'
import { LocalDataSource } from 'ng2-smart-table';
import { ProductInvoice } from 'src/app/products/products_invoice.model';

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

  //public source: LocalDataSource; // add a property to the component

  // data = [
  //   // ... our data here
  // ];

  // ############# customer's details #############
  //cust_name_control = new FormControl('');
  //cust_input_name_control = new FormControl('');
  show_cust_search_flag = false;
  @ViewChild('cust_divClick') cust_divClick: ElementRef;
 
  selectedCustId:number;
  selectedCustId_flag = false;
  //cust_name_filter: string;
  customers:Customer[];
  //private total_cust_count: number = 0;
  public cust_source = new LocalDataSource(this.customers); // create the source


  // ############# product's details #############
  //prod_name_control = new FormControl('');
  show_prod_search_flag = false;
  @ViewChild('prod_divClick') prod_divClick: ElementRef;

  selectedProdId:number;
  selectedProdId_flag = false;
  //private selectedProd:Product;
  //prod_name_filter: string;
  products:Product[];
  public prod_source = new LocalDataSource(); // create the source
  public selected_prod_source = new LocalDataSource(); // create the source



  // ############# product's list #############
  sold_products_invoice:ProductInvoice[] = [];
  selected_products:Product[] = [];
  sold_products:Product[] = [];
  //sold_products: Array<Product> = [];

  selectedProdRows: any;
  private storeSub: Subscription;


  constructor(
    private route:ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private invoiceService: InvoiceService,
    private ref: ChangeDetectorRef
    ) { 
    }

  ngOnDestroy(){
    if(this.storeSub)
      this.storeSub.unsubscribe();

  }

  ngOnInit(): void {
    // this.store.dispatch(new CustomerActions.FetchCustomersCount());
    // this.store.select('customers').subscribe(custState => {
    //   this.total_cust_count = custState.cust_total_count;
    // });
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
      this.store.dispatch(new InvoiceActions.AddInvoice(this.invoiceForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route });
  }

 
  onCancel() {   
    this.router.navigate(['../'], {relativeTo: this.route });
  }

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

    // ########### Customers smart table #############
    onClickCustSearchBtn2(){
    }

    onClickCustSearchBtn(){
      if(this.selectedCustId_flag)
        this.show_cust_search_flag = true;
      else
        this.show_cust_search_flag = !this.show_cust_search_flag;

      this.selectedCustId_flag = false;

      this.store.dispatch(new CustomerActions.FetchCustomers());
      this.store.select('customers').subscribe(custState=>{
          this.customers = custState.customers;
          this.cust_source.load(this.customers);
          setTimeout(() => {
            this.cust_divClick.nativeElement.click();
            }, 200);
      });       

    }

    onCustomAction_cust(event) {
      switch ( event.action) {
        case 'selectRecord':
          this.selectRecord_cust(event.data);
          break;
      }
    }

    public selectRecord_cust(formData: any) {
        this.customers = [formData];
        this.selectedCustId_flag = true;
         this.cust_source.load(this.customers);
         setTimeout(() => {
          this.cust_divClick.nativeElement.click();
          }, 200);
    }

    onSearch_cust(query: string = '') {
      this.cust_source.setFilter([
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

    cust_settings = {
      actions: {
        columnTitle: 'Actions',
        add: false,
        edit: false,
        delete: false,
        custom: [
        { name: 'selectRecord', title: '<i class="ion-document" title="selectRecord"> Select </i>'}
      ],
        position: 'left'
      },

      pager: {
        display: true,
        perPage: 4
      },

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

    // ########### Products smart table #############
    onClickProdSearchBtn2(){
    }

    onClickProdSearchBtn(){
      // if(this.selectedProdId_flag)
      //   this.show_prod_search_flag = true;
      // else
        this.show_prod_search_flag = !this.show_prod_search_flag;

      //this.selectedProdId_flag = false;

      this.store.dispatch(new ProductActions.FetchProducts());
      this.store.select('products').subscribe(prodState=>{
          this.products = prodState.products;
          this.prod_source.load(this.products);
          setTimeout(() => {
            this.prod_divClick.nativeElement.click();
            }, 200);
      });       

    }

    // onCustomAction_prod(event) {
    //   switch ( event.action) {
    //     case 'selectRecord':
    //       this.selectRecord_prod(event.data);
    //       break;
    //   }
    // }

    // public selectRecord_prod(formData: any) {
    //     this.products = [formData];
    //     this.selectedProdId_flag = true;
    //      this.prod_source.load(this.products);
    //      setTimeout(() => {
    //       this.prod_divClick.nativeElement.click();
    //       }, 200);
    // }

    // UserRowSelected Event handler
    onRowSelect(event) {
    //  console.log(event.selected.checkbox.value);
    this.selected_products = event.selected;
    // this.sold_products_invoice = [];
    // for(var index in this.sold_products)
    // { 
    //     this.sold_products_invoice.push(
    //       new ProductInvoice(
    //         this.sold_products[index].id,
    //         this.sold_products[index].name,
    //         this.sold_products[index].description,
    //         this.sold_products[index].imagePath,
    //         this.sold_products[index].price,
    //         1,
    //         "Yes"
    //       )
    //     );
    // }

    //this.prod_source.
    
  }

  onSelectProducts() {
    this.show_prod_search_flag = !this.show_prod_search_flag;
    this.selectedProdId_flag = true;
    let flag:Boolean;
    flag = false;

    if(this.sold_products.length === 0)
    {
      console.log('sold_products empty')
      this.sold_products = this.selected_products;
    }else {
      console.log('sold_products not empty')
      this.sold_products.forEach((item_sold, index_sold) => {
        this.selected_products.forEach((item_selected, index_selected) => {
          if(item_sold.id === item_selected.id)
          {
            flag = true;
          }
        });
      });
      
      if(flag)
        alert('At least one of the product is already added');
      else{
        this.selected_products.forEach((item_sold, index_sold) => {
          this.sold_products.push(item_sold);
        });
      }
    }

    this.selected_prod_source.load(this.sold_products);
    setTimeout(() => {
      this.prod_divClick.nativeElement.click();
      }, 200);
    
      //if(item.id !== )
    

  }

    onSearch_prod(query: string = '') {
      this.cust_source.setFilter([
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
          field: 'description',
          search: query
        },
        {
          field: 'price',
          search: query
        }
      ], false); 
      // second parameter specifying whether to perform 'AND' or 'OR' search 
      // (meaning all columns should contain search query or at least one)
      // 'AND' by default, so changing to 'OR' by setting false here
    }

    prod_settings = {
      actions: false,
      selectMode: 'multi',
      pager: {
        display: true,
        perPage: 4
      },

      columns: {
        id: {
          title: 'ID',
          filter: true
        },
        name: {
          title: 'Product Name',
          filter: true
        },
        description: {
          title: 'Description',
          filter: true
        },
        price: {
          title: 'Price',
          filter: true
        },
        quantity: {
          title: 'Quantity',
          filter: {
            type: 'number'
          }
        }
      }
    };

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
