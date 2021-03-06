import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as ProductActions from '../store/product.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  error: string = null;   // Managed by NgRX
  click_flag: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
      if( this.eRef.nativeElement.contains(event.target) ||
      event.target.classList.contains('list-group-item') ||
      event.target.classList.contains('list-group-item-heading') ||
      event.target.classList.contains('list-group-item-text') ||
      event.target.classList.contains('img-responsive') ||
      event.target.classList.contains('pull-left'))
      {/* console.log("clicked inside");*/}
      else {/*console.log("clicked outside");*/
      if(this.click_flag)
        this.onCancelEditing();

      this.click_flag = true;
    }
  }

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private eRef: ElementRef
    ) {}

  ngOnInit(): void {

    this.click_flag = false;

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

          return productsState.products.filter((product, index)=> {
            if(this.id === product.id)
              {
                return product; 
              }           
          });
        })
      )
      .subscribe(product =>{
        this.product = product[0];
        window.scroll(0,0);
      });

      this.store.dispatch(new ProductActions.SetProduct(this.product));

      this.store.select('products').subscribe(prodState => {
        this.error = prodState.prodError;
        localStorage.setItem("productsState", JSON.stringify(prodState));

        // if(this.product === null || this.id === null)
        // {
        //   this.product = prodState.product;
        // this.id = prodState.product.id;
        // }
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
    this.store.dispatch(new ProductActions.DeleteProduct(this.product.id));
    this.store.select('products').subscribe(prodState => {
      this.error = prodState.prodError;
    });
    this.router.navigate(['../'], {relativeTo: this.route });

  }

  onCancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  onHandleError() {
    this.store.dispatch(new ProductActions.ClearError());
  }

}
