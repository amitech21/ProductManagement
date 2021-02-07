import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from './store/product.actions'; 
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: []
})
export class ProductsComponent implements OnInit {
  selectedProduct: Product;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  flag: boolean;

  ngOnInit(): void {
    console.log("/products on init");

    // this.flag = (localStorage.getItem('products_visibility') === "false" ) ? false : true; 

    this.store.select('products').subscribe(prodState => {
      //if(prodState.products.length == 0)
      this.flag = (!!prodState.products) ? true : false; 
    });

    this.store.dispatch(new ProductActions.SetVisibility(this.flag) );
  }

}
