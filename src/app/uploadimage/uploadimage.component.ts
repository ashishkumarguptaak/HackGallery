import { Component, OnInit } from '@angular/core';
import { ImageCompressService, IImage } from  'ng2-image-compress';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent implements OnInit {
  selectedImage: any;
  processedImages: any = [];

  imageurl = "../../assets/icons/upload.gif";

  imagedata = {name:"",description:"",email:localStorage.getItem("Email"),image:""};

  constructor(private imgCompressService: ImageCompressService, public uploadservice: UploadService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    

    let images: Array<IImage> = [];
    
    ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
      observableImages.subscribe((image) => {
        images.push(image);
      }, (error) => {
        console.log("Error while converting");
      }, () => {
                this.processedImages = images;
                this.imageurl = this.processedImages[0].compressedImage.imageDataUrl;
                this.imagedata.image = this.imageurl;
      });
    });
 
   
  }

  uploadImage(){
    if(this.imagedata.image === "")
    console.log("Image required.")
    else {
      this.uploadservice.uploadimage(this.imagedata);
      console.log("Upload Image");
    }
  }

}
