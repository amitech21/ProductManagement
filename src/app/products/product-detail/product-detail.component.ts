import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as ProductActions from '../store/product.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.id = +params['id'];
    //       this.recipe = this.recipeService.getProduct(this.id);
    //     }
    //   );

    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('products');
        }),
        map(productsState => {
          return productsState.products.find((product, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(product =>{
        this.product = product;
      });

      
  }

  onAddToShoppingList() {
    //this.productService.addIngredientsToShoppingList(this.product.ingredients);
    // this.store.dispatch(
    //   new ShoppingListActions.AddIngredients(this.product.ingredients)
    // );
  }

  onEditProduct(){
    this.router.navigate(['edit'] , {relativeTo: this.route});
    //this.router.navigate(['../' , this.id , 'edit'] , {relativeTo: this.route});
    
  }

  onDeleteProduct(){
    //this.productService.deleteProduct(this.id);
    this.store.dispatch(new ProductActions.DeleteProduct(this.product.id));
    //this.store.dispatch(new ProductActions.SetProducts(JSON.parse(localStorage.getItem('products'))));
    this.router.navigate(['../'], {relativeTo: this.route });

  }

  onCancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route });
  }

}
