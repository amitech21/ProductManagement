import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as CustomerActions from '../store/customer.actions'; 
import { Subscription } from 'rxjs';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  customerForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route:ActivatedRoute, 
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnDestroy(){
    if(this.storeSub)
      this.storeSub.unsubscribe();
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
    // const newCustomer = new Customer(
    //   this.customerForm.value['name'],
    //   this.customerForm.value['description'],
    //   this.customerForm.value['imagePath'],
    //   this.customerForm.value['ingredients'],
    //   );

    if(this.editMode)
    {
      this.store.dispatch(new CustomerActions.UpdateCustomer({
        index: this.id,
        newCustomer: this.customerForm.value
      }));
    }
    else{
      this.store.dispatch(new CustomerActions.AddCustomer(this.customerForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  // onAddIngredient() {
  //   (<FormArray>this.customerForm.get('ingredients')).push(
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
  //   (<FormArray>this.customerForm.get('ingredients')).removeAt(index);
  // }
  onCancel() {   
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  // get controls() { // a getter!
  //   return (<FormArray>this.customerForm.get('ingredients')).controls;
  // }

  private initForm(){
    let customerId = 0;
    let customerName = '';
    let customerMobileNo = 0;
    let customerAddress = '';
    let customerGstNo= 0;

    if(this.editMode){
      //const customer = this.customerService.getCustomer(this.id);

      this.storeSub = this.store.select('customers')
      .pipe(map(customersState => {
        return customersState.customers.find((customer, index) => {
          return customer.id === this.id;
          //return customer.id === this.id;
        });
      }))
      .subscribe(customer => {
          customerId = customer.id;
          customerName = customer.name;
          customerMobileNo = customer.mobile_no;
          customerAddress = customer.address;
          customerGstNo = customer.gst_no;
          // if(customer['ingredients']) {
          //   for (let ingredient of customer.ingredients) {
          //     customerIngredients.push(
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

    this.customerForm = new FormGroup({
      'id' : new FormControl(customerId),
      'name' : new FormControl(customerName, Validators.required),
      'mobile_no' : new FormControl(customerMobileNo, Validators.required),
      'address' : new FormControl(customerAddress, Validators.required),
      'gst_no' : new FormControl(customerGstNo, Validators.required),

    });

  }

}
