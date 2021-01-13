import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as CustomerActions from '../store/customer.actions';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;
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
    //       this.recipe = this.recipeService.getCustomer(this.id);
    //     }
    //   );

    //this.store.dispatch(new CustomerActions.SetVisibility(false));
    //localStorage.setItem('customers_visibility', "false");
    //this.customerListComponent.customersVisibility = false;

    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('customers');
        }),
        map(customersState => {
          // return customersState.customers.find((customer, index) => {
          //   return index === this.id;
          // });
          return customersState.customers.filter((customer, index)=> {
            if(this.id === customer.id)
              {
                return customer; 
              }           
        });
        })
      )
      .subscribe(customer =>{
        this.customer = customer[0];
        window.scroll(0,0);
      });

      
  }

  onAddToShoppingList() {
    //this.customerService.addIngredientsToShoppingList(this.customer.ingredients);
    // this.store.dispatch(
    //   new ShoppingListActions.AddIngredients(this.customer.ingredients)
    // );
  }

  onEditCustomer(){
    this.router.navigate(['edit'] , {relativeTo: this.route});
    //this.router.navigate(['../' , this.id , 'edit'] , {relativeTo: this.route});
    
  }

  onDeleteCustomer(){
    //this.customerService.deleteCustomer(this.id);
    this.store.dispatch(new CustomerActions.DeleteCustomer(this.customer.id));
    //this.store.dispatch(new CustomerActions.SetCustomers(JSON.parse(localStorage.getItem('customers'))));
    this.router.navigate(['../'], {relativeTo: this.route });

  }

  onCancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route });
  }

}
