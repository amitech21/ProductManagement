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


@NgModule({
    declarations: [
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    InvoiceItemComponent,
    InvoiceStartComponent,
    InvoiceEditComponent
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, InvoicesRoutingModule]
})
export class InvoicesModule {}