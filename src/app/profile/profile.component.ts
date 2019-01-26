import { Component, OnInit } from '@angular/core';
import { UpdateprofileService } from '../services/updateprofile.service';
import { PDFService } from '../services/pdf.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  disabled = true;

  profiledata = {name:"", email:"", password:"",city:"",state:"",education:"",profileimage:"../../assets/icons/photographer.jpg",date:new Date(),verified: true};


  constructor(public profileservice: UpdateprofileService,private pdfService:PDFService) { }

  ngOnInit() {
    this.profiledata.name = localStorage.getItem("Name");
    this.profiledata.email = localStorage.getItem("Email");
    this.profiledata.password = localStorage.getItem("Password");
    this.profiledata.city = localStorage.getItem("City");
    this.profiledata.state = localStorage.getItem("State");
    this.profiledata.education = localStorage.getItem("Education");
    this.profiledata.profileimage = localStorage.getItem("ProfileImage");
    console.log(this.pdfService.getPdfItems());
  }

  edit(){ 
    this.disabled = !this.disabled;
  }

  updateprofile(){
    if(!this.disabled){
      this.profileservice.update(this.profiledata);
      console.log("Updated");
    }else{
      console.log("Invalid");
    }
  }

}
