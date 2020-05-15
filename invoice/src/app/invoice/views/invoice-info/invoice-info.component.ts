import { Component, OnInit, Input } from '@angular/core';
import { invoiceInfo } from 'src/app/interfaces/invoiceInfo';

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.css']
})
export class InvoiceInfoComponent implements OnInit {

  @Input() invoiceInfo: invoiceInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
