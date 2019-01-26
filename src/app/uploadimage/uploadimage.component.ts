import { Component, OnInit } from '@angular/core';
import { ImageCompressService } from  'ng2-image-compress';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { UploadService } from '../services/upload.service';
import { NgForm } from '@angular/forms';

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

  filedata = {name:"",description:"",email:localStorage.getItem("Email"), pdf: "",upvotes:0};

  constructor(private imgCompressService: ImageCompressService, public uploadservice: UploadService) { }

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'pdfname'});

  ngOnInit() {
    console.log("Configouring uploader.");
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item, status, response);
         this.uploadservice.uploadFile(this.filedata);
         alert('File uploaded successfully');
     };
 }

  uploadPDF(uploadForm: NgForm){
    console.log("Uploading PDF.")
    this.uploader.uploadAll();

  }

}
