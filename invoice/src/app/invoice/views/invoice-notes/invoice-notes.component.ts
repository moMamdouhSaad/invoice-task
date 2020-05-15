import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-invoice-notes',
  templateUrl: './invoice-notes.component.html',
  styleUrls: ['./invoice-notes.component.css']
})
export class InvoiceNotesComponent implements OnInit {

  @Input() invoiceNotes:string;

  constructor() { }

  ngOnInit(): void {
  }

}
