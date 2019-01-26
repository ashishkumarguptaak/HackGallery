import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { saveAs } from 'file-saver';
import { ActivatedRoute, Params } from '@angular/router';
import { PDFService } from '../services/pdf.service';
import { PDFItem } from '../services/PDF/pdf';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  pdfSrc = "http://localhost:4200/uploads/pdfname-1548506663154.pdf";
  name = "";
  description = "";
  email = "example@example.com";

  data: PDFItem;

  constructor(@Inject(Http) public http,private route: ActivatedRoute,private pdfservice: PDFService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      const index = +params['index'];
      const type = params['type'];
      
      if(type === "home"){

      }else if(type === "user"){
        this.data = this.pdfservice.getPdfItems()[index];
        this.pdfSrc = "http://localhost:4200/uploads/" + JSON.parse(JSON.stringify(this.data)).pdf;
        this.name = JSON.parse(JSON.stringify(this.data)).name;
        this.description = JSON.parse(JSON.stringify(this.data)).description;
        this.email = JSON.parse(JSON.stringify(this.data)).email;
        console.log(JSON.parse(JSON.stringify(this.data)).pdf+" TESTING OF DATA");
      }
    })
  }


  downloadFile() {
    console.log("Downloading function called.");
    this.http.get(this.pdfSrc).subscribe(
      (response) => {
        var mediaType = 'application/pdf';
        var blob = new Blob([response._body], {type: mediaType});
        var filename = 'pdfname-1548506663154.pdf';
        saveAs(blob, filename);
      });

      console.log("Downloading function finished.");
  }

}
