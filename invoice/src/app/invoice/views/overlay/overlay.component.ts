import { Component, OnInit } from '@angular/core';
import { ReadFileService } from '../../services/read-file.service';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  fileErrMsg:string = "You must only select .json files";
  importErr:boolean = false;

  jsonErrMsg:string = "Sorry, json inputs  is not compatible with system requirements";
  jsonErr:boolean = false;
  
  speceficErr:string = null;

  constructor(public readFileService: ReadFileService) { }

  ngOnInit(): void {
    this.readFileService.getFileTypeErr$().subscribe(data=>this.importErr = data);
    this.readFileService.getJsonFileErr$().subscribe(data=>this.jsonErr = data);
    this.readFileService.getErrMsg$().subscribe(data=>this.speceficErr = data)
  }

  readFile(file: File){
    this.readFileService.readFile(file)
  }

  fileChanged(e) {
    let file = e.target.files[0];
    this.readFileService.readFile(file);
  }

}
