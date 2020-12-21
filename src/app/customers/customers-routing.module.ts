import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AuthGuard } from '../auth/auth.guard';
import { CustomerStartComponent } from './customer-start/customer-start.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomersResolverService } from './customers-resolver.service';

const routes: Routes = [
    {   
        path: '', 
        component: CustomersComponent, 
        canActivate: [AuthGuard], 
        children: [
            {   path: '', component: CustomerStartComponent   },
            {   path: 'new', component: CustomerEditComponent },
            {
                path: ':id', 
                component: CustomerDetailComponent, 
                resolve: [CustomersResolverService] 
            },
            {
                path: ':id/edit', 
                component: CustomerEditComponent,
                resolve: [CustomersResolverService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule {}