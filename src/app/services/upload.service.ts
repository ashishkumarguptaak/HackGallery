import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { PDFService } from './pdf.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(@Inject(Http) public _http, public router: Router,@Inject(PDFService) public pdfservice) { }

  getpdf(email){
    this._http.post('http://localhost:1818/getpdf', email).subscribe(result=>{
      if (result._body === "false"){
        console.log("No pdfs.");
      }else {
        console.log("Fetched PDFs.");
        var data = JSON.parse((result._body));
        this.pdfservice.addPdfItems(data);
      }
    });
  }

  uploadFile(filedata){
    this._http.post('http://localhost:1818/filedata', filedata).subscribe(result =>{
      if(result._body === "false"){
        console.log("Data Upload Failed.");
      }else{
        console.log("Data upload success.");
        this.router.navigate(['/uploads']);
      }
    });
  }
}
