import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { PDFService } from '../services/pdf.service';
import { PDFItem } from '../services/PDF/pdf';
import { UniversalService } from '../services/universal.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  emaildata={email:''};
  pdfData : PDFItem[];

  constructor(public uploadservice: UploadService,public pdfservice: PDFService,public universalservice:UniversalService) { }

  ngOnInit() {
    console.log("App Componenet");
    var Email = localStorage.getItem("Email");
    this.emaildata.email = Email;
    this.uploadservice.getpdf(this.emaildata);

    this.universalservice.universalpdf();

    this.pdfData = this.pdfservice.getPdfItems();
    console.log("length "+this.pdfservice.getPdfItems().length);
    for(let pdfItem of this.pdfData){
      console.log("For: "+pdfItem.name)
    }
  }

}
