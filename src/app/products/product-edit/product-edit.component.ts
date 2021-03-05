import { Component, OnInit, OnDestroy } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as ProductActions from '../store/product.actions'; 
import { Subscription } from 'rxjs';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  productForm: FormGroup;
  // error: string = null;   // Managed by NgRX

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

    if(this.editMode)
    {
      this.store.dispatch(new ProductActions.UpdateProduct({
        index: this.id,
        newProduct: this.productForm.value
      }));
    }
    else{
      this.store.dispatch(new ProductActions.AddProduct(this.productForm.value));
    }
    // this.store.select('products').subscribe(prodState => {
    //   this.error = prodState.prodError;
    // });
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  onCancel() {   
    this.router.navigate(['../'], {relativeTo: this.route });
  }


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
            // Store
        localStorage.setItem("productsState", JSON.stringify(productsState));
        
        return productsState.products.find((product, index) => {
          return product.id === this.id;
          //return product.id === this.id;
        });
      }))
      .subscribe(product => {
          productId = product.id;
          productName = product.name;
          productImagePath = product.imagePath;
          productDescription = product.description;
          productPrice = product.price;
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
