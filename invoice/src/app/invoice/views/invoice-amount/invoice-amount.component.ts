import { Component, OnInit, Input } from '@angular/core';
import { invoiceAmount } from 'src/app/interfaces/invoiceAmount';

@Component({
  selector: 'app-invoice-amount',
  templateUrl: './invoice-amount.component.html',
  styleUrls: ['./invoice-amount.component.css']
})
export class InvoiceAmountComponent implements OnInit {

  @Input() invoiceAmount:invoiceAmount;

  constructor() { }

  ngOnInit(): void {
  
  }

}
