import { Component, OnInit, Input } from '@angular/core';
import { invoiceItems } from 'src/app/interfaces/invoiceItems';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-invoice-items',
  templateUrl: './invoice-items.component.html',
  styleUrls: ['./invoice-items.component.css']
})
export class InvoiceItemsComponent implements OnInit {

  @Input() invoiceItems:Item[];

  constructor() { }

  ngOnInit(): void {}

}
