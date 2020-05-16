import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as _ from 'lodash';

const jsonKeysMustInclued =
  [
'companyName', 'address', 'date', 'receiptNo', 'city','contactName','billToClientCompanyName',
'billToAddress', 'billToPhone', 'billToEmail', 'shipToName', 'shipToClientCompanyName',
'shipToAddress', 'shipToPhone', 'items', 'notes', 'discount', 'taxRate', 'shipping'
  ];

@Injectable({
  providedIn: 'root'
})

export class ReadFileService {

  private dataInFile = new Subject<any>();
  private fileTypeErr = new BehaviorSubject<boolean>(null);
  private jsonFileErr = new BehaviorSubject<boolean>(null);
  private currentViewfile = new BehaviorSubject<string>(null);
  private errMsg = new BehaviorSubject<string>(null);

  constructor() { }
 



   getAllObjectProps (obj) {
    var keys = [];
    for( const key in obj ) {
       switch (key){
         case "items":
         obj[key].forEach(x=>{ 
           if(!this.checkItemsKeys(x)){ // item object is wrong
            this.setJsonFileErr(true);
            this.setFileTypeErr(null);
            throw new Error("Json inputs is not compatible with system requirements");
          }})
         break;
         case "discount":
         case "taxRate":
         case "shipping":
         case "receiptNo":  
         if( typeof obj[key] != 'number'){
          this.setJsonFileErr(true);
          this.setFileTypeErr(null);
          this.setErrMsg('receiptNo, discount, taxRate, shipping  keys must be numbers only');
          throw new Error("Json inputs is not compatible with system requirements");  
               } 
       }   
       keys.push(key);

    }
    return keys;
    }

    
  private checkItemsKeys(item: any){    
          let descriptionCheck =  item.hasOwnProperty('description');
          let qtyCheck =  item.hasOwnProperty('qty');
          let unitPriceCheck =  item.hasOwnProperty('unitPrice');
          if(qtyCheck && unitPriceCheck){ //now check if their values is numbers
            if(typeof item['qty'] != 'number' || typeof item['unitPrice'] != 'number' ){
              this.setErrMsg('qty, unitPrice keys must be numbers only');
              return false
            }
          } 

          return descriptionCheck && qtyCheck && unitPriceCheck
  }

  private setData(data:any){
   let keysCameFromFile = this.getAllObjectProps(JSON.parse(data));  
   let isCompatibleJson =_.isEqual(keysCameFromFile.sort() , jsonKeysMustInclued.sort())
   if(isCompatibleJson){
    this.dataInFile.next(JSON.parse(data));
    this.setJsonFileErr(false);
    this.setErrMsg(null);
    window.scroll(0,0);
    return true
   }
   else{
     this.setJsonFileErr(true);
     this.setFileTypeErr(null);
     return false
   }
    
  }
  getFileData$(){
    return this.dataInFile.asObservable();
  }

  private setFileTypeErr(value: boolean){
    this.fileTypeErr.next(value);
  }
  getFileTypeErr$(){
    return this.fileTypeErr.asObservable();
  }

  private setJsonFileErr(value: boolean){
    this.jsonFileErr.next(value);
  }
  getJsonFileErr$(){
    return this.jsonFileErr.asObservable();
  }

  readFile(file: File){
    var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    if(ext != 'json' ){
      this.setFileTypeErr(true);
      this.setJsonFileErr(null);
      throw new Error("Selected file is not json");  
    }
    this.setFileTypeErr(false);
    let reader = new FileReader();
    reader.onload = () => {
      if(this.setData(reader.result))
      this.setCurrentFileName(file.name)
    }
    reader.onerror = (error) => {
      console.log(error);
    }

    reader.readAsText(file);
  }

  private setCurrentFileName(fileName:string){
    this.currentViewfile.next(fileName);
  }
  getCurrentFileName$(){
    return this.currentViewfile.asObservable();
  }

  private setErrMsg(msg:string){
    this.errMsg.next(msg);
  }
  getErrMsg$(){
    return this.errMsg.asObservable();
  }

}
