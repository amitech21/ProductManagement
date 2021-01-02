import { NgModule } from '@angular/core';
import { InvoicesComponent } from './invoices.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceItemComponent } from './invoice-list/invoice-item/invoice-item.component';
import { InvoiceStartComponent } from './invoice-start/invoice-start.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from '../shared/shared.module';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    //NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbAutocompleteModule
   } from '@nebular/theme';
import { FilterPipe } from './filter.pipe';
   //import { NgSelectConfig, ɵs  } from '@ng-select/ng-select'; 

@NgModule({
    declarations: [
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    InvoiceItemComponent,
    InvoiceStartComponent,
    InvoiceEditComponent,
    FilterPipe
    ],
    imports: 
    [RouterModule, 
    SharedModule, 
    ReactiveFormsModule, 
    InvoicesRoutingModule, 
    //BrowserAnimationsModule,
    //NbThemeModule.forRoot({ name: 'default' }),
    NbButtonModule, 
    NbCardModule,
    //NbProgressBarModule,
    //NbTabsetModule,
    //NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbAutocompleteModule
]

})
export class InvoicesModule {}