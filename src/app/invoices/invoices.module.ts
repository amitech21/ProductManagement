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
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Ng2CompleterModule } from '@akveo/ng2-completer';
import { CheckboxComponent } from './invoice-edit/checkbox.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    declarations: [
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    InvoiceItemComponent,
    InvoiceStartComponent,
    InvoiceEditComponent,
    CheckboxComponent,
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
    NbAutocompleteModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    NgxPaginationModule
    //LocalDataSource
]

})
export class InvoicesModule {}