import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../services/overlay.service';
import { ReadFileService } from '../services/read-file.service';
import { Invoice } from 'src/app/interfaces/invoice';
import { InvoiceHeader } from 'src/app/interfaces/invoiceHeader';
import { invoiceInfo } from 'src/app/interfaces/invoiceInfo';
import { invoiceItems } from 'src/app/interfaces/invoiceItems';
import { invoiceAmount } from 'src/app/interfaces/invoiceAmount';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private overlayService: OverlayService, private readFileService: ReadFileService) { }
   
   invoiceHeader: InvoiceHeader;
   invoiceInfo: invoiceInfo; 
   invoiceItems: Item[];
   invoiceNotes: string;
   invoiceAmount: invoiceAmount;

  ngOnInit(): void {

    this.readFileService.getFileData$().subscribe(inputs=>{

      const invoiceInputs: Invoice = inputs;

      console.log(invoiceInputs);

      //assign invoice header
      this.invoiceHeader = {
        companyName: invoiceInputs.companyName,
        date: invoiceInputs.date,
        receiptNo: invoiceInputs.receiptNo,
        address: invoiceInputs.address,
        city: invoiceInputs.city
      }

      //assign invoice info
      this.invoiceInfo = {
        contactName: invoiceInputs.contactName,
        billToClientCompanyName: invoiceInputs.billToClientCompanyName,
        billToAddress: invoiceInputs.billToAddress,
        billToPhone: invoiceInputs.billToPhone,
        billToEmail: invoiceInputs.billToEmail,
        shipToName: invoiceInputs.shipToName,
        shipToClientCompanyName: invoiceInputs.shipToClientCompanyName,
        shipToAddress: invoiceInputs.shipToAddress,
        shipToPhone: invoiceInputs.shipToPhone
      }

      //assign invoice items
      this.invoiceItems = invoiceInputs.items;
      //assign invoice notes
      this.invoiceNotes = invoiceInputs.notes;

      //assign invoice amounts
      const subTotal = this.getSubtotal(this.invoiceItems);
      const subTotalLessDiscount = subTotal - invoiceInputs.discount;
      const totalTax = invoiceInputs.taxRate/100 * subTotalLessDiscount;
      const balancePaid =  subTotalLessDiscount + totalTax + invoiceInputs.shipping;
      this.invoiceAmount = {
        subTotal: subTotal,
        subTotalLessDiscount: subTotalLessDiscount,
        discount: invoiceInputs.discount,
        taxRate: invoiceInputs.taxRate,
        totalTax: totalTax,
        shipping: invoiceInputs.shipping,
        balancePaid:balancePaid
      }
           
        console.log(this.invoiceAmount)

    });



       this.overlayService.showOverlay();
       this.readFileService.getJsonFileErr$().subscribe((data:boolean)=>{
       if(data == false){
        this.overlayService.hideOverlay();
      }
    })
  }

  getSubtotal(items:Item[]){
    console.log(items)
    let subTotal = 0;
    for(let item of items){
      subTotal += item.qty * item.unitPrice
    }
    return subTotal
  }

  getTotalTax(){

  }

}
