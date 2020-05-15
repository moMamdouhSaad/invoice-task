import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Invoice } from 'src/app/interfaces/invoice';
import * as _ from 'lodash';
import { Item } from 'src/app/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {

  private dataInFile = new Subject<any>();
  private fileTypeErr = new BehaviorSubject<boolean>(null);
  private jsonFileErr = new BehaviorSubject<boolean>(null);
  private currentViewfile = new BehaviorSubject<string>(null);

  constructor() { }
 jsonKeysMustInclued =
[
'companyName', 'address', 'date', 'receiptNo', 'city','contactName','billToClientCompanyName',
'billToAddress', 'billToPhone', 'billToEmail', 'shipToName', 'shipToClientCompanyName',
'shipToAddress', 'shipToPhone', 'items', 'notes', 'discount', 'taxRate', 'shipping'
];

itemPropertiesMustIncluded = 
[
  'qty','description','unitPrice'
]

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
         if( typeof obj[key] != 'number'){
          this.setJsonFileErr(true);
          this.setFileTypeErr(null);
          throw new Error("Json inputs is not compatible with system requirements");         } 
       }   
       keys.push(key);

    }
    return keys;
    }

    
  checkItemsKeys(item: any){    
          let descriptionCheck =  item.hasOwnProperty('description');
          let qtyCheck =  item.hasOwnProperty('qty');
          let unitPriceCheck =  item.hasOwnProperty('unitPrice');
          if(qtyCheck && unitPriceCheck){ //now check if their values is numbers
            console.log(item['qty']);
            if(typeof item['qty'] != 'number' || typeof item['unitPrice'] != 'number' ){
              return false
            }
          } 

          return descriptionCheck && qtyCheck && unitPriceCheck
  }

  setData(data:any){
   let keysCameFromFile = this.getAllObjectProps(JSON.parse(data));  
   let isCompatibleJson =_.isEqual(keysCameFromFile.sort() , this.jsonKeysMustInclued.sort())
   if(isCompatibleJson){
    this.dataInFile.next(JSON.parse(data));
    this.setJsonFileErr(false);
   }
   else{
     this.setJsonFileErr(true);
     this.setFileTypeErr(null);
   }
    
  }
  getFileData$(){
    return this.dataInFile.asObservable();
  }

  setFileTypeErr(value: boolean){
    this.fileTypeErr.next(value);
  }
  getFileTypeErr$(){
    return this.fileTypeErr.asObservable();
  }

  setJsonFileErr(value: boolean){
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
      return
    }
    this.setFileTypeErr(false);
    this.setCurrentFileName(file.name)
    let reader = new FileReader();
    reader.onload = () => {
      this.setData(reader.result);
    }
    reader.onerror = (error) => {
      console.log(error);
    }

    reader.readAsText(file);
  }

  setCurrentFileName(fileName:string){
    this.currentViewfile.next(fileName);
  }
  getCurrentFileName$(){
    return this.currentViewfile.asObservable();
  }

}
