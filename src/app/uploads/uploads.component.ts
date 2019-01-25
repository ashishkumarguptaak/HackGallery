import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  emaildata = {email:""};
  

  constructor(public uploadservice: UploadService,public imageservice: ImageService) { }

  ngOnInit() {
    var Email = localStorage.getItem("Email");
    this.emaildata.email = Email;
    console.log(Email);
    this.uploadservice.getimages(this.emaildata);
  }

}
