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
        console.log(OTP);
        var encrypted = CryptoJS.enc.Utf8.parse(OTP).toString();
        console.log(encrypted);
        localStorage.setItem("OTP",encrypted);
        this.router.navigate(['verify']);
        this.otpdata.email = userdata.email;
        this.otpdata.otp = OTP;
        this._http.post('http://localhost:1818/otp',this.otpdata).subscribe(result=>{
          console.log(result._body);
        });
      }else {
        console.log(result._body);
      }
    });
  }
}
