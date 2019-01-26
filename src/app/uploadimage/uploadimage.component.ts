import { Component, OnInit } from '@angular/core';
import { ImageCompressService } from  'ng2-image-compress';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { UploadService } from '../services/upload.service';

const URL = 'http://localhost:1818/uploadfile';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent implements OnInit {
  file;
  selectedImage: any;
  processedImages: any = [];

  imageurl = "../../assets/icons/upload.gif";

  imagedata = {name:"",description:"",email:localStorage.getItem("Email"),image:Object};

  constructor(private imgCompressService: ImageCompressService, public uploadservice: UploadService) { }

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'pdfname'});

  ngOnInit() {
    console.log("Configouring uploader.");
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
 }

  uploadImage(){
    console.log("Uploading PDF.")
    this.uploader.uploadAll();
  }

}
