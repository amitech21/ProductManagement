import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from './store/product.actions'; 
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';


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
    this.flag = (localStorage.getItem('products_visibility') === "false" ) ? false : true; 

    if(!localStorage.getItem('products'))
      this.store.dispatch(new ProductActions.FetchProductsByPg({
        pgNo: 0,
        item_count: 4
      }) );

    this.store.dispatch(new ProductActions.SetVisibility(this.flag) );
  }

}
