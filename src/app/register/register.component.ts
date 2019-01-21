import { Component, OnInit, Inject } from '@angular/core';
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
  userdata = {name:'', email:'', password:'',profileimage:'',date:new Date(),verified: false};
  
  constructor(@Inject(RegisterService) public registerservice) { }

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
    console.log(this.userdata);
    this.registerservice.registeruser(this.userdata);
    this.userdata = {name:'', email:'', password:'',profileimage:'',date:new Date(),verified: false};
    this.confirmpassword = '';
    this.imageUrl = '../../assets/icons/female.png';
    console.log(this.userdata);
  }

}
