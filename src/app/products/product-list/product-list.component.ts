import { Component, OnInit, OnDestroy, Injectable} from '@angular/core';

import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as ProductActions from '../../products/store/product.actions';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
subscription: Subscription;
pre_subscription: Subscription;
sub_fetchCount: Subscription;

public productsVisibility: boolean = true;

page = 1;
count = 0;
tableSize = 4;

  products: Product[];
  // products: Product[] = [
  //   new Product('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/product-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Product('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/product-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ProductActions.FetchProductsCount());
    this.sub_fetchCount = this.store.select('products').subscribe(productsState => {
      this.count = productsState.prod_total_count;
    });

    this.products = JSON.parse(localStorage.getItem('products'));
    //console.log(JSON.parse(localStorage.getItem('products')));
    //this.store.dispatch(new ProductActions.SetProducts(this.products));
    this.productsVisibility = JSON.parse(localStorage.getItem('products_visibility'));
    

    // this.subscription = this.productService.productsChanged.subscribe(
    this.subscription = this.store
    .select('products')
    .pipe
    (map(productsState => {
      //this.productsVisibility = productsState.visibility;
      return productsState;
    }),
    map(productsState => productsState.products))
    .subscribe(
      (products: Product[]) => {
        this.products = products;
        //console.log(this.products);
      }
    );

    //this.products = this.productService.getProducts();
    
  }

  onShow(){
    
    // this.store.dispatch(new ProductActions.FetchProducts() );
    // this.store.dispatch(new ProductActions.SetVisibility(true) );
    this.productsVisibility = true;
    localStorage.setItem('products_visibility', "true");
    this.products = JSON.parse(localStorage.getItem('products'));

    //this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  onHide(){
    localStorage.setItem('products_visibility', "false");
    this.productsVisibility = false;
    this.store.dispatch(new ProductActions.SetVisibility(false) );
  }

  onNew(){
    this.productsVisibility = false;
    this.store.dispatch(new ProductActions.SetVisibility(false) );
    this.router.navigate(['new'] , {relativeTo: this.route} );
  }

  ngOnDestroy() {
    if(!!this.subscription)
      this.subscription.unsubscribe();

    if(!!this.pre_subscription)
      this.pre_subscription.unsubscribe();

    if(!!this.sub_fetchCount)
      this.sub_fetchCount.unsubscribe();
  }

  onTableDataChange(event){
    this.store.dispatch(new ProductActions.FetchProductsByPg({
      pgNo: event-1,
      item_count: this.tableSize
    }));
    //this.fetchPosts();
  } 

}
