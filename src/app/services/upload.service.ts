import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(@Inject(Http) public _http, public router: Router,@Inject(ImageService) public imageservice) { }

  uploadimage(imagedata){
    this._http.post('http://localhost:1818/upload', imagedata).subscribe(result =>{
      if(result._body === "true"){
        console.log("Uploaded successfully.");
        this.router.navigate(['uploads'])
      }else{
        console.log(result._body);
      }
    });
  }

  getimages(email){
    this._http.post('http://localhost:1818/getimages', email).subscribe(result=>{
      if (result._body === "false"){
        console.log("No images.");
      }else {
        console.log("Images");
        this.imageservice.addImageItems(result._body);
      }
    });
  }
}
