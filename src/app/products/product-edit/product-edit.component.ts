import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as ProductActions from '../store/product.actions'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;

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
    // const newProduct = new Product(
    //   this.productForm.value['name'],
    //   this.productForm.value['description'],
    //   this.productForm.value['imagePath'],
    //   this.productForm.value['ingredients'],
    //   );

    if(this.editMode)
    {
      //this.productService.updateProduct(this.id, this.productForm.value);
      this.store.dispatch(new ProductActions.UpdateProduct({
        index: this.productForm.value['id'],
        newProduct: this.productForm.value
      }));
    }
    else{
      //this.productService.addProduct(this.productForm.value);
      this.store.dispatch(new ProductActions.AddProduct(this.productForm.value));
    }
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  // onAddIngredient() {
  //   (<FormArray>this.productForm.get('ingredients')).push(
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
  //   (<FormArray>this.productForm.get('ingredients')).removeAt(index);
  // }
  onCancel() {   
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  // get controls() { // a getter!
  //   return (<FormArray>this.productForm.get('ingredients')).controls;
  // }

  private initForm(){
    let productId = 0;
    let productName = '';
    let productDescription = '';
    let productImagePath = '';
    let productPrice= 0;

    if(this.editMode){
      //const product = this.productService.getProduct(this.id);

      this.storeSub = this.store.select('products')
      .pipe(map(productsState => {
        return productsState.products.find((product, index) => {
          return index === this.id;
          //return product.id === this.id;
        });
      }))
      .subscribe(product => {
          productId = product.id;
          productName = product.name;
          productImagePath = product.imagePath;
          productDescription = product.description;
          productPrice = product.price;
          // if(product['ingredients']) {
          //   for (let ingredient of product.ingredients) {
          //     productIngredients.push(
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

    this.productForm = new FormGroup({
      'id' : new FormControl(productId),
      'name' : new FormControl(productName, Validators.required),
      'description' : new FormControl(productDescription, Validators.required),
      'imagePath' : new FormControl(productImagePath, Validators.required),
      'price' : new FormControl(productPrice, Validators.required),

    });

  }

}
