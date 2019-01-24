import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  otpdata = {email:'', otp:''}

  constructor(@Inject(Http) public _http, private router: Router) { }

  registeruser(userdata){
    this._http.post('http://localhost:1818/registeruser',userdata).subscribe(result=>{
      if(result._body === "true" ){
        console.log("OTP Send");
        var OTP:string = Math.floor(100000 + Math.random() * 900000)+"";
        var encrypted = CryptoJS.enc.Utf8.parse(OTP).toString();
        this.router.navigate(['verify']);
        this.otpdata.email = userdata.email;
        this.otpdata.otp = OTP;
        this._http.post('http://localhost:1818/otp',this.otpdata).subscribe(result=>{
          console.log(result._body);
          if(result._body === "OTP sent successfully."){
            localStorage.setItem("OTP",encrypted);
            localStorage.setItem("Email",userdata.email);
          }
        });
      }else {
        console.log(result._body);
      }
    });
  }
}
