import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { ProfileModel } from '../models/profilemodel'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  profile: any;
  profileModel:ProfileModel;
  email:string="";
  constructor(@Inject(Http) public _http, private router: Router) { }

  userlogin(logindata){
    this._http.post('http://localhost:1818/login',logindata).subscribe(result => {
      if(result._body === "true"){
        localStorage.setItem("Email", logindata.email);
        this.email= logindata.email;
        this._http.post('http://localhost:1818/profile', {email:logindata.email}).subscribe(result => {
        if(result._body === "Something went wrong."){
          console.log(result._body);
        }else {
          this.profile = JSON.parse(result._body);
          localStorage.setItem("Profile",this.profile);
          console.log("Login Service");
          console.log(this.profile.email);
        }
      })
        this.router.navigate(['/']);
      }else {
        console.log(result._body);
      }
    })
  }

  userlogout(){
    localStorage.removeItem("Email");
    this.router.navigate(['home']);
  }
  localstorage(item)
  {
    return localStorage.getItem(item);
  }
}
