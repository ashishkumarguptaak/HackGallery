import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImageCompressService, IImage } from  'ng2-image-compress';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedImage: any;
  processedImages: any = [];

  confirmpassword: string;
  imageUrl:string="../../assets/icons/female.png";
  userdata = {name:'', email:'', password:'',city:'',state:'',education:'',profileimage:'',date:new Date(),verified: false};
  
  constructor(public registerservice: RegisterService) { }

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
                this.imageUrl = this.processedImages[0].compressedImage.imageDataUrl;
                this.userdata.profileimage = this.imageUrl;
      });
    });
   
  }

  public registerUser(registerForm: NgForm){
    this.registerservice.registeruser(this.userdata);
    this.userdata = {name:'', email:'', password:'',city:'Enter city',state:'Enter state',education:'Enter education status',profileimage:'',date:new Date(),verified: false};
    registerForm.resetForm();
    this.confirmpassword = '';
    this.imageUrl = '../../assets/icons/female.png';
  }

}
