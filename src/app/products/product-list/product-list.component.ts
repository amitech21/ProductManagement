import { Component, OnInit, OnDestroy, Injectable} from '@angular/core';

import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

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

isLoading = false;      // Managed by NgRX
error: string = null;   // Managed by NgRX

public productsVisibility: boolean = true;

page = 1;
count = 0;
tableSize = 4;

  products: Product[];
  // products: Product[] = [
  //   new Product('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/product-collections/collection-image/2013/05/epic-summer-salad.jpg'),
  //   new Product('test1 resipe' , 'test 1 desc' , 'https://www.bbcgoodfood.com/sites/default/files/product-collections/collection-image/2013/05/epic-summer-salad.jpg')
  // ];

  table_config: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { 
    
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductActions.FetchProductsCount());    

    if(!!this.products)
    {
      this.sub_fetchCount = this.store.select('products').subscribe(productsState => {
        this.count = productsState.prod_total_count;
        this.products = productsState.products;
        this.productsVisibility = productsState.visibility;

        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: this.page,
          totalItems: this.count
        }

      });
    } else {
      this.store.dispatch(new ProductActions.FetchProductsByPg({
        pgNo: 0,
        item_count: 4
      }) );

      this.sub_fetchCount = this.store.select('products').subscribe(productsState => {
        this.count = productsState.prod_total_count;
        this.products = productsState.products;
        this.productsVisibility = productsState.visibility;

        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: this.page,
          totalItems: this.count
        }

      });
    }
  }

  onShow(){
    this.productsVisibility = true;

    this.store.dispatch(new ProductActions.FetchProductsCount());
    this.store.dispatch(new ProductActions.FetchProductsByPg({
      pgNo: 0, item_count: this.tableSize
    }));

    this.sub_fetchCount = this.store.select('products').subscribe(productsState => {
      this.count = productsState.prod_total_count;
      this.products = productsState.products;
      this.productsVisibility = productsState.visibility;
      this.error = productsState.prodError;
      this.isLoading = productsState.prodLoading;
    });
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onHide(){
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
    this.store.dispatch(
      new ProductActions.FetchProductsByPg({
      pgNo: event-1,
      item_count: this.tableSize
      })
    );

    this.store.select('products').subscribe(
      prodState => {
        this.products = prodState.products;
        this.table_config = {
          id: 'basicPaginate',
          itemsPerPage: this.tableSize,
          currentPage: event,
          totalItems: this.count
        }
      }
    );
  } 

  onHandleError() {
    this.store.dispatch(new ProductActions.ClearError());
  }

  // trackByMethod(index:number, el:any): number {
  //   console.log(index);
  //   if(index % 2 === 0)
  //     return el.id;
  // }

}
