import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, debounceTime, distinctUntilChanged, tap, delay } from 'rxjs/operators';
import * as InvoiceActions from '../store/invoice.actions'; 
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customers/customer.model';
import { InvoiceService } from '../invoice.service'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({ 
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InvoiceEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  invoiceForm: FormGroup;
  custForm: FormGroup;



  selectedCustId:number;
  selectedCustId_flag = false;
  cust_list_flag = false;
  private selectedCust:Customer;
  cust_names: Array<string> = ["asd","qwe","zxc"];
  cust_name_filter: string;

  cust_name_control = new FormControl('');
  prod_name = new FormControl('');

  cust_id = new FormControl('');
  cust_name = new FormControl('');
  cust_mobile_no = new FormControl('');
  cust_address = new FormControl('');
  cust_gst_no = new FormControl('');

  //cust_names_array = new FormArray([]);

  private storeSub: Subscription;
  private sub_custControl: Subscription;
  private sub_custName: Subscription;
  private sub_selectedCust: Subscription;
  
  customers:Customer[];




  constructor(
    private route:ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private invoiceService: InvoiceService,
    private http: HttpClient,
    private ref: ChangeDetectorRef
    ) { 
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
    }

  selectCustId(data:number){
    console.log('test4');
    console.log(data);
    this.selectedCustId_flag=true;
    this.sub_selectedCust = this.invoiceService.getCustomersById(data).subscribe((data: Customer) => {
      this.selectedCust = data;

      this.cust_name_control.setValue(this.selectedCust.name + " with ID: " + +this.selectedCust.id);

      this.cust_id.setValue(this.selectedCust.id);
      this.cust_name.setValue(this.selectedCust.name);
      this.cust_mobile_no.setValue(this.selectedCust.mobile_no);
      this.cust_address.setValue(this.selectedCust.address);
      this.cust_gst_no.setValue(this.selectedCust.gst_no);

      //this.customers = [];
    });
  }

  onSelectCustBtn(){
      this.customers = [];
      this.selectedCustId_flag = false;
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

  }

  ngOnInit(): void {
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

}
