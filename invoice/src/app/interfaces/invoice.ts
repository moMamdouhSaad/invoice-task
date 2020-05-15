import { invoiceItems } from './invoiceItems';
import { Item } from './item';

export interface Invoice {
    //invoice header
    companyName:string,
    date:string,
    address:string,
    receiptNo:string,
    city:string,

    //invoice info
    contactName:string,
    billToClientCompanyName:string,
    billToAddress:string,
    billToPhone:string,
    billToEmail:string,
    shipToName:string,
    shipToClientCompanyName:string,
    shipToAddress:string,
    shipToPhone:string,

    //invoice items
    items: Item[],

    //invoice note
    notes: string,

    //invoice amount
    subTotal:number,
    discount: number,
    subTotalLessDiscount:number,
    taxRate: number,
    totalTax:number,
    shipping: number,
    balancePaid: number



}
