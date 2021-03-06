import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductStartComponent,
    ProductEditComponent    
    ],
    imports: [
        RouterModule, 
        SharedModule, 
        ReactiveFormsModule, 
        ProductsRoutingModule,
        NgxPaginationModule
    ],
    
})
export class ProductsModule {}