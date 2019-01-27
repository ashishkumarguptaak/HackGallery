import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {email: "", password: ""};

  constructor(public loginservice: LoginService) { }

  ngOnInit() {
  }

  loginUser(loginForm: NgForm){
    this.loginservice.userlogin(this.login);
    this.login = {email: "", password: ""};
    loginForm.resetForm();
  }

  forgotPassword(){
    console.log("Forgot password.");
  }

}
