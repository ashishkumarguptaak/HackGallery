import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { PDFService } from '../services/pdf.service';
import { PDFItem } from '../services/PDF/pdf';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  pdfData : PDFItem[];

  constructor(public uploadservice: UploadService,public pdfservice: PDFService) { }

  ngOnInit() {
    this.pdfData = this.pdfservice.getPdfItems();
    console.log("length "+this.pdfservice.getPdfItems().length);
    for(let pdfItem of this.pdfData){
      console.log("For: "+pdfItem.name)
    }
  }

}
