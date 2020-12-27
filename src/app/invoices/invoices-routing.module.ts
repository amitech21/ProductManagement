import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { AuthGuard } from '../auth/auth.guard';
import { InvoiceStartComponent } from './invoice-start/invoice-start.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoicesResolverService } from './invoices-resolver.service';
import { NbSelectModule, NbThemeModule, NbLayoutModule, NbCardModule, NbAutocompleteModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


const routes: Routes = [
    {   
        path: '', 
        component: InvoicesComponent, 
        canActivate: [AuthGuard], 
        children: [
            {   path: '', component: InvoiceStartComponent   },
            {   path: 'new', component: InvoiceEditComponent },
            {
                path: ':id', 
                component: InvoiceDetailComponent, 
                resolve: [InvoicesResolverService] 
            },
            {
                path: ':id/edit', 
                component: InvoiceEditComponent,
                resolve: [InvoicesResolverService]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),  
        NbCardModule
    ],
    exports: [RouterModule]

})
export class InvoicesRoutingModule {}