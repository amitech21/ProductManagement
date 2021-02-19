import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import * as InvoiceActions from '../store/invoice.actions'; 
import * as CustomerActions from '../../customers/store/customer.actions'; 
import * as ProductActions from '../../products/store/product.actions'; 
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customers/customer.model';
import { Product } from 'src/app/products/product.model';
import { InvoiceService } from '../invoice.service'
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { ProductInvoice } from 'src/app/products/products_invoice.model';
import { Invoice } from '../invoice.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({ 
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  private id: number;
  public editMode: boolean = false;
  public invoiceForm: FormGroup;
  public products_price: number = 0;
  public gst_: number = 0;
  public discount_: number = 0;
  public total_price: number = 0;

  //public source: LocalDataSource; // add a property to the component

  // data = [
  //   // ... our data here
  // ];

  // ############# customer's details #############
  //cust_name_control = new FormControl('');
  //cust_input_name_control = new FormControl('');
  public show_cust_search_flag = false;
  @ViewChild('cust_divClick') cust_divClick: ElementRef;
 
  public selectedCustId:number;
  public selectedCustId_flag = false;
  //cust_name_filter: string;
  public customers:Customer[];
  public selectedCustomer: Customer;
  //private total_cust_count: number = 0;
  public cust_source = new LocalDataSource(this.customers); // create the source


  // ############# product's details #############
  //prod_name_control = new FormControl('');
  public  show_prod_search_flag = false;
  @ViewChild('prod_divClick') prod_divClick: ElementRef;

  public selectedProdId:number;
  public selectedProdId_flag = false;
  //private selectedProd:Product;
  //prod_name_filter: string;
  public products:Product[];
  public prod_source = new LocalDataSource(); // create the source
  public selected_prod_source = new LocalDataSource(); // create the source



  // ############# product's list #############
  //sold_products_invoice:ProductInvoice[] = [];
  public selected_products:Product[] = [];
  public sold_products:ProductInvoice[] = [];
  //sold_products: Array<Product> = [];

  public selectedProdRows: any;
  private storeSub: Subscription;

 // ############# total price #############
//  show_totalPrice_flag = false;



  constructor(
    private route:ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private invoiceService: InvoiceService,
    private ref: ChangeDetectorRef,
    private _http: HttpClient
    ) { 

      // this.invoiceForm.get('total_gst').valueChanges.subscribe(data => {
      //   console.log(data);
      // });
    }

  // getTotalPrice(){
  //   this.show_totalPrice_flag = true;
  // }

  ngOnDestroy(){
    if(this.storeSub)
      this.storeSub.unsubscribe();

  }

  ngOnInit(): void {
    // this.store.dispatch(new CustomerActions.FetchCustomersCount());
    // this.store.select('customers').subscribe(custState => {
    //   this.total_cust_count = custState.cust_total_count;
    // });
    // console.log('init called !!');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initForm();
        }
      );
      
      this.invoiceForm.get('total_gst').valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((data:number) => {
        this.gst_ = data;
        this.calculateTotalPrice(
          this.products_price,
          this.gst_,
          this.discount_
        );
        this.invoiceForm.get('total_price').setValue(this.total_price);
      });

      this.invoiceForm.get('total_discount').valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((data:number) => {
        this.discount_ = data;
        this.calculateTotalPrice(
          this.products_price,
          this.gst_,
          this.discount_
        );
        this.invoiceForm.get('total_price').setValue(this.total_price);
      });
      
      this.cust_source.onChanged().subscribe((change) => {
        if (change.action === 'page') {
          console.log('page clicked !!');
          console.log(change.paging.page);
          // this.cust_source.count = 100;
          //this.pageChange(change.paging.page);
          // this.store.dispatch(new CustomerActions.FetchCustomersByPg({
          //   pgNo: change.paging.page,
          //   item_count: 8
          // }));
        }
      });

      this.prod_source.onChanged().subscribe((change) => {
        if (change.action === 'page') {
          console.log('page clicked !!');
          console.log(change.paging.page);
        }
      });

      // this.cust_source = new ServerDataSource(this._http, 
      //   {
      //   // dataKey: 'data.data',
      //   // endPoint: environment.webAppEndPoint + '/customers/listByPage/'
      //   // + '0'
      //   // + '/'
      //   // + '8',
      //   pagerPageKey: 0, // this should be page number param name in endpoint (request not response) for example 'page'
      //   pagerLimitKey: 4, // this should page size param name in endpoint (request not response)
      //   totalKey: 50, // this is total records count in response, this will handle pager
      //   });
  }

  calculateTotalPrice(products: number, gst:number, discount: number) {
    let gst_val: number = (products * gst)/100;
    this.total_price = products + gst_val - discount;
  }

  onSubmit() {

    if(this.editMode)
    { 
      console.log(this.invoiceForm.value);
      console.log(this.selectedCustomer);
      console.log(this.sold_products);



      this.id = this.invoiceForm.get('id').value;



      this.store.dispatch(new InvoiceActions.UpdateInvoice({
        index: this.id,
        newInvoice:
        new Invoice(
          this.invoiceForm.get('id').value,
          this.invoiceForm.get('cDate').value,
          this.invoiceForm.get('uDate').value,
          this.selectedCustomer,
          this.sold_products, 
          this.invoiceForm.get('total_gst').value,
          this.invoiceForm.get('total_discount').value,
          this.invoiceForm.get('total_price').value
          )
      }));


    }
    else{
      this.store.dispatch(new InvoiceActions.AddInvoice(
        new Invoice(
        0,
        '',
        '',
        this.selectedCustomer,
        this.sold_products, 
        this.invoiceForm.get('total_gst').value,
        this.invoiceForm.get('total_discount').value,
        this.invoiceForm.get('total_price').value
        )
      ));
    }
    //this.router.navigate(['../'], {relativeTo: this.route });
  }

 
  onCancel() {   
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  private initForm(){
    let invoiceId = 0;
    // let invoiceCDate = '';
    // let invoiceMDate = '';
    // let invoiceCustId = 0;
    // let invoiceProducts = ProductInvoice[];
    // let invoiceGst = 0;
    // let invoiceDiscount = 0;

    let invoiceCDate = "";
    let invoiceUDate = "";
    let invoiceProducts_price = 0;
    let invoiceTotal_gst = 0;
    let invoiceTotal_discount = 0;
    let invoiceTotal_price = 0;

    if(this.editMode){
      //const invoice = this.invoiceService.getInvoice(this.id);

      this.storeSub = this.store.select('invoices')
      .pipe(map(invoicesState => {
        return invoicesState.invoices.find((invoice, index) => {
          return invoice.id === this.id;
          //return invoice.id === this.id;
        });
      }))
      .subscribe((invoice: Invoice) => {
          invoiceId = invoice.id;
          invoiceCDate = invoice.created_date_time;
          invoiceUDate = invoice.updated_date_time;
          invoiceTotal_gst = invoice.gst;
          invoiceTotal_discount = invoice.discount;
          invoiceTotal_price = invoice.total_price;

          this.gst_ = invoice.gst;
          this.discount_ = invoice.discount;
          this.total_price = invoice.total_price;

          this.products_price = 0;
          invoice.products.forEach(sold_prod => {
            //console.log(sold_prod.quantity * sold_prod.price);
            this.products_price = this.products_price + (sold_prod.quantity * sold_prod.price) ;
          });

          invoiceProducts_price = this.products_price;

          let selectedCustomers: Customer[] = [];
          selectedCustomers[0] = invoice.customer;
          this.cust_source.load(selectedCustomers);

          this.selectedCustomer = invoice.customer;
          this.sold_products = invoice.products;
          this.selected_prod_source.load(invoice.products);

          setTimeout(() => {
          this.cust_divClick.nativeElement.click();
          }, 200);

          this.selectedCustId_flag = true;
          this.selectedProdId_flag = true;
      });

      
    }

    this.invoiceForm = new FormGroup({
      'id' : new FormControl(invoiceId),
      'cDate' : new FormControl(invoiceCDate),
      'uDate' : new FormControl(invoiceUDate),
      'products_price' : new FormControl(invoiceProducts_price),
      'total_gst' : new FormControl(invoiceTotal_gst),
      'total_discount' : new FormControl(invoiceTotal_discount),
      'total_price' : new FormControl(invoiceTotal_price),

      // 'cDate' : new FormControl(invoiceCDate, Validators.required),
      // 'mDate' : new FormControl(invoiceMDate, Validators.required),
      // 'cust_id' : new FormControl(invoiceCustId, Validators.required),
      // 'products_id' : new FormControl(invoiceProducts, Validators.required),
      // 'gst_no' : new FormControl(invoiceGst, Validators.required),
      // 'gst_no' : new FormControl(invoiceDiscount, Validators.required),
      // 'gst_no' : new FormControl(invoiceTotalPrice, Validators.required),

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

      //this.store.dispatch(new CustomerActions.FetchCustomersCount());
      this.store.dispatch(new CustomerActions.FetchCustomers());
      // this.store.dispatch(new CustomerActions.FetchCustomers());
      this.store.select('customers').subscribe(custState=>{
          this.customers = custState.customers;
          this.cust_source.load(this.customers);
          setTimeout(() => {this.cust_divClick.nativeElement.click();}, 200);
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
        let selectedCustomers: Customer[] = [formData];
        this.selectedCustomer = selectedCustomers[0];
        this.selectedCustId_flag = true;
         this.cust_source.load(selectedCustomers);
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
      this.show_prod_search_flag = !this.show_prod_search_flag;
      this.store.dispatch(new ProductActions.FetchProducts());
      this.store.select('products').subscribe(prodState=>{
          this.products = prodState.products;
          this.prod_source.load(this.products);
          setTimeout(() => {this.cust_divClick.nativeElement.click();}, 200);
      });       
    }

    onRowSelect(event) {
    this.selected_products = event.selected;    
  }

  onSelectProducts() {
    this.show_prod_search_flag = !this.show_prod_search_flag;
    this.selectedProdId_flag = true;
    let flag:Boolean;
    flag = false;
    let sold_products_local:ProductInvoice[] = [];

    if(this.sold_products.length === 0)
    {
      this.selected_products.forEach(selected_product => {
        sold_products_local.push(
          new ProductInvoice(
            selected_product,
            0
          )
        );
      });

      //this.sold_products = this.selected_products;
    }else {
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
        this.selected_products.forEach(selected_product => {
          sold_products_local.push(
            new ProductInvoice(
              selected_product,
              0
            )
          );
        });
      }
    }
    this.sold_products = sold_products_local;
    this.selected_prod_source.load(this.sold_products);
    setTimeout(() => {
      this.prod_divClick.nativeElement.click();
      }, 200);
  }

  onCustomAction_prod(event) {
    switch ( event.action) {
      
      case 'addQuantity':
        this.addQuantity_prod(event.data);
        break;

      case 'removeQuantity':
        this.removeQuantity_prod(event.data);
        break;

      case 'removeRow':
        this.removeRow_prod(event.data);
        break;
    }
  }

  public addQuantity_prod(formData: any) {
    let product:ProductInvoice = formData;
    let products:ProductInvoice[] = JSON.parse(JSON.stringify(this.sold_products)); 
    this.sold_products.forEach((sold_product, index) => {
      
      if(sold_product.id === product.id){
        product = new ProductInvoice(
              new Product(
                product.id,
                product.name,
                product.description,
                product.imagePath,
                product.price
              ),product.quantity+1);
              
        products.splice(index,1,product);
        this.sold_products = JSON.parse(JSON.stringify(products)); 
        this.products_price = this.products_price + product.price;
      }
        
    });
       this.selected_prod_source.load(this.sold_products);
       this.invoiceForm.get('products_price').setValue(this.products_price);
       this.total_price = this.products_price;

        this.calculateTotalPrice(
          this.products_price,
          this.gst_,
          this.discount_
        );
        this.invoiceForm.get('total_price').setValue(this.total_price);

       setTimeout(() => {this.cust_divClick.nativeElement.click();}, 200);
  }

  public removeQuantity_prod(formData: any) {
    let product:ProductInvoice = formData;
    this.sold_products.forEach((sold_product, index) => {
      if(sold_product.id === product.id){
        if(sold_product.quantity > 0)
          product.quantity = product.quantity - 1;
          this.sold_products[index] = product;
          this.products_price = this.products_price - product.price;
      }
        
    });
    this.selected_prod_source.load(this.sold_products);
    this.invoiceForm.get('products_price').setValue(this.products_price);
    this.total_price = this.products_price;
    this.calculateTotalPrice(
      this.products_price,
      this.gst_,
      this.discount_
    );
    this.invoiceForm.get('total_price').setValue(this.total_price);
    setTimeout(() => {this.cust_divClick.nativeElement.click();}, 200);
  }

  public removeRow_prod(formData: any) {
    let product:ProductInvoice = formData;
    this.sold_products = this.sold_products.filter(sold_product => sold_product.id !== product.id);
    this.selected_prod_source.load(this.sold_products);
    this.products_price = this.products_price - (product.price * product.quantity);
    this.invoiceForm.get('products_price').setValue(this.products_price);
    this.total_price = this.products_price;
    this.calculateTotalPrice(
      this.products_price,
      this.gst_,
      this.discount_
    );
    this.invoiceForm.get('total_price').setValue(this.total_price);
    setTimeout(() => {this.cust_divClick.nativeElement.click();}, 200);
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
        }
      }
    };

    prod_newSettings = { 
      actions: {
        columnTitle: 'Quantity',
        add: false,
        edit: false,
        delete: false,
        custom: [
        { 
          name: 'addQuantity', 
          title: '<i class="ion-document" title="addQuantity">+ add</i>'
        },
        { 
          name: 'removeQuantity', 
          title: '<i class="ion-document" title="removeQuantity">- sub</i>'
        }
        ,
        { 
          name: 'removeRow', 
          title: '<i class="ion-document" title="removeRow">Delete</i>'
        }
      ],
        position: 'right'
      },
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
