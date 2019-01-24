import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmpassword: string;
  imageUrl:string="../../assets/icons/female.png";
  userdata = {name:'', email:'', password:'',city:'Enter city',state:'Enter state',education:'Enter education status',profileimage:'',date:new Date(),verified: false};
  
  constructor(public registerservice: RegisterService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    const file = event.target.files[0]
    
    var reader = new FileReader();
    
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;

      //console.log( this.imageUrl);
      this.userdata.profileimage = this.imageUrl;
    }
    reader.readAsDataURL(file);
   
  }

  public registerUser(registerForm: NgForm){
    //console.log(this.userdata);
    this.registerservice.registeruser(this.userdata);
    this.userdata = {name:'', email:'', password:'',city:'Enter city',state:'Enter state',education:'Enter education status',profileimage:'',date:new Date(),verified: false};
    registerForm.resetForm();
    this.confirmpassword = '';
    this.imageUrl = '../../assets/icons/female.png';
  }

}
