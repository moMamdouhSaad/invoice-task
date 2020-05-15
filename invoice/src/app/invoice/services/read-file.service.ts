import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Invoice } from 'src/app/interfaces/invoice';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {

  private dataInFile = new Subject<any>();
  private fileTypeErr = new BehaviorSubject<boolean>(null);
  private jsonFileErr = new BehaviorSubject<boolean>(null);

  constructor() { }
 propertiesMustInclued = ['companyName', 'address', 'date', 'receiptNo', 'city',
'contactName','billToClientCompanyName', 'billToAddress', 'billToPhone', 'billToEmail', 'shipToName', 'shipToClientCompanyName',
'shipToAddress', 'shipToPhone', 'items', 'notes', 'discount', 'taxRate', 'shipping'
];
   getAllObjectProps (obj) {
    var keys = [];
    for( const key in obj ) {
        if ( obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }
    return keys;
    }

    


  setData(data:any){
   let keysCameFromFile = this.getAllObjectProps(JSON.parse(data));  
   let isCompatibleJson =_.isEqual(keysCameFromFile.sort() , this.propertiesMustInclued.sort())
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
    let reader = new FileReader();
    reader.onload = () => {
      this.setData(reader.result);
    }
    reader.onerror = (error) => {
      console.log(error);
    }

    reader.readAsText(file);
  }

}
