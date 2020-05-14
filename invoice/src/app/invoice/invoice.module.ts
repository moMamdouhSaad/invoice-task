import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceHeaderComponent } from './views/invoice-header/invoice-header.component';
import { InvoiceInfoComponent } from './views/invoice-info/invoice-info.component';
import { InvoiceItemsComponent } from './views/invoice-items/invoice-items.component';
import { InvoiceNotesComponent } from './views/invoice-notes/invoice-notes.component';
import { InvoiceAmountComponent } from './views/invoice-amount/invoice-amount.component';
import { InvoiceComponent } from './invoice/invoice.component';



@NgModule({
  declarations: [InvoiceHeaderComponent, InvoiceInfoComponent, InvoiceItemsComponent, InvoiceNotesComponent, InvoiceAmountComponent, InvoiceComponent],
  imports: [
    CommonModule
  ],
  exports:[InvoiceComponent]
})
export class InvoiceModule { }
