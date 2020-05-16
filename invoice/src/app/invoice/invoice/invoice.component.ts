import { Component, OnInit } from '@angular/core';
import { OverlayService } from '../services/overlay.service';
import { ReadFileService } from '../services/read-file.service';
import { Invoice } from 'src/app/interfaces/invoice';
import { InvoiceHeader } from 'src/app/interfaces/invoiceHeader';
import { invoiceInfo } from 'src/app/interfaces/invoiceInfo';
import { invoiceAmount } from 'src/app/interfaces/invoiceAmount';
import { Item } from 'src/app/interfaces/item';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  fileErrMsg:string = "You must only select .json files";
  importErr:boolean = false;
  jsonErrMsg:string = "Sorry, json inputs  is not compatible with system requirements";
  jsonErr:boolean = false;
  speceficErr:string = null;
  showBtnsContainer:boolean = false;
  downloadJsonHref: SafeUrl;
  constructor(private overlayService: OverlayService, public readFileService: ReadFileService,private sanitizer: DomSanitizer) { }
   
   invoiceHeader: InvoiceHeader;
   invoiceInfo: invoiceInfo; 
   invoiceItems: Item[];
   invoiceNotes: string;
   invoiceAmount: invoiceAmount;

  ngOnInit(): void {
    this.getJsonInputs();
    this.overlayService.showOverlay();
    this.readFileService.getJsonFileErr$().subscribe((data:boolean)=>{
       if(data == false){
        this.overlayService.hideOverlay();
        this.showBtnsContainer = true

      }
    })
    this.readFileService.getFileTypeErr$().subscribe(data=>this.importErr = data);
    this.readFileService.getJsonFileErr$().subscribe(data=>this.jsonErr = data);
    this.readFileService.getErrMsg$().subscribe(data=>this.speceficErr = data)

  }

  getJsonInputs(){
    this.readFileService.getFileData$().subscribe(inputs=>{
      const invoiceInputs: Invoice = inputs;
      this.generateDownloadJsonUri(invoiceInputs)

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
    });

  }

  getSubtotal(items:Item[]){
    let subTotal = 0;
    for(let item of items){
      subTotal += item.qty * item.unitPrice
    }
    return subTotal
  }

  readFile(file: File){
    this.readFileService.readFile(file)
  }

  fileChanged(e) {
    let file = e.target.files[0];
     this.readFileService.readFile(file);
  }

  generateDownloadJsonUri(json) {
    var theJSON = JSON.stringify(json);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
}

}
