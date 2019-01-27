import { Component, OnInit } from '@angular/core';
import { UploadService } from './services/upload.service';
import { UniversalService } from './services/universal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  emaildata = {email:""};
  title = 'BookGallery';

  constructor(public uploadservice: UploadService, public universalservice: UniversalService) { }


  ngOnInit(){
    console.log("App Componenet");
    var Email = localStorage.getItem("Email");
    this.emaildata.email = Email;
    this.uploadservice.getpdf(this.emaildata);

    this.universalservice.universalpdf();
  }
}
