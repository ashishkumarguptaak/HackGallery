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
  emaildata = {email:""};
  pdfData ;

  constructor(public uploadservice: UploadService,public pdfservice: PDFService) { }

  ngOnInit() {
    var Email = localStorage.getItem("Email");
    this.emaildata.email = Email;
    this.uploadservice.getpdf(this.emaildata);
    this.pdfData = this.pdfservice.getPdfItems();
    console.log("length"+this.pdfservice.getPdfItems().length);
    for(let pdfItem of this.pdfData){
      console.log("For: "+pdfItem.name)
    }
  }

}
