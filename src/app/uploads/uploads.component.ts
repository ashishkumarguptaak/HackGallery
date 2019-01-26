import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { PDFService } from '../services/pdf.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  emaildata = {email:""};
  

  constructor(public uploadservice: UploadService,public pdfservice: PDFService) { }

  ngOnInit() {
    var Email = localStorage.getItem("Email");
    this.emaildata.email = Email;
    this.uploadservice.getpdf(this.emaildata);
  }

}
