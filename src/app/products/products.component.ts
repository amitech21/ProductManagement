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
  isLoading = false;      // Managed by NgRX
  error: string = null;   // Managed by NgRX

  flag: boolean;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  ngOnInit(): void {

    this.store.select('products').subscribe(prodState => {
      this.flag = (!!prodState.products) ? true : false; 
      this.error = prodState.prodError;
    });

    this.store.dispatch(new ProductActions.SetVisibility(this.flag) );
  }

  onHandleError() {
    this.store.dispatch(new ProductActions.ClearError());
  }


}
