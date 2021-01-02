import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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


  selectedCustId = "";
  cust_names: Array<string> = ["asd","qwe","zxc"];
  cust_name: string;

  cust_name_control = new FormControl('');
  subscription: Subscription;
  subscription_cust: Subscription;
  
  customers:Customer[];


  private storeSub: Subscription;

  constructor(
    private route:ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>,
    private invoiceService: InvoiceService,
    private http: HttpClient
    ) { 
      this.subscription = this.cust_name_control.valueChanges
      .pipe(
        debounceTime(1500), // Waiting for 1.5 sec while you are typing
        distinctUntilChanged() // Prevents the emitting if the 'start' value and the 'end' value are the same
      )
      .subscribe(value => {
        console.log('test2');
        console.log(value);
        
        this.subscription_cust = this.invoiceService.getCustomers(value).subscribe(
          (data:Customer[] ) => {
            console.log('test3');
            console.log(data);

            this.customers = data;
          }
        );
        // TODO: call BE here with this.httpClient...
      });
    }

  ngOnDestroy(){
    if(this.storeSub)
      this.storeSub.unsubscribe();

    if(this.subscription)
      this.subscription.unsubscribe();

    if(this.subscription_cust)
      this.subscription_cust.unsubscribe();

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
    // const newInvoice = new Invoice(
    //   this.invoiceForm.value['name'],
    //   this.invoiceForm.value['description'],
    //   this.invoiceForm.value['imagePath'],
    //   this.invoiceForm.value['ingredients'],
    //   );

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

  // onAddIngredient() {
  //   (<FormArray>this.invoiceForm.get('ingredients')).push(
  //     new FormGroup({
  //       'name' : new FormControl(null, Validators.required),
  //       'amount' : new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }

  // OnDeleteIngrdient(index: number) {
  //   (<FormArray>this.invoiceForm.get('ingredients')).removeAt(index);
  // }
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
          // if(invoice['ingredients']) {
          //   for (let ingredient of invoice.ingredients) {
          //     invoiceIngredients.push(
          //       new FormGroup({
          //         'name' : new FormControl(ingredient.name, Validators.required),
          //         'amount' : new FormControl(ingredient.amount, [
          //           Validators.required,
          //           Validators.pattern(/^[1-9]+[0-9]*$/)
          //         ])
          //       })
          //     )
          //   }
          // }
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
