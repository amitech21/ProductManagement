import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerItemComponent } from './customer-list/customer-item/customer-item.component';
import { CustomerStartComponent } from './customer-start/customer-start.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
    CustomersComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerItemComponent,
    CustomerStartComponent,
    CustomerEditComponent,
    
    ],
    imports: [
        RouterModule, 
        SharedModule, 
        ReactiveFormsModule, 
        CustomersRoutingModule,
        NgxPaginationModule
    ]
})
export class CustomersModule {}