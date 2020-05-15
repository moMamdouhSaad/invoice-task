import { Component, OnInit, Input } from '@angular/core';
import { InvoiceHeader } from 'src/app/interfaces/invoiceHeader';

@Component({
  selector: 'app-invoice-header',
  templateUrl: './invoice-header.component.html',
  styleUrls: ['./invoice-header.component.css']
})
export class InvoiceHeaderComponent implements OnInit {

  @Input() invoiceHeader: InvoiceHeader; 

  constructor() { }

  ngOnInit(): void {
  }

}
