import { Component, OnInit } from '@angular/core';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  emaildata = {email:""};
  title = 'HackGallery';

  constructor(public uploadservice: UploadService) { }


  ngOnInit(){
    console.log("App Componenet");
    var Email = localStorage.getItem("Email");
    this.emaildata.email = Email;
    this.uploadservice.getpdf(this.emaildata);
  }
}
