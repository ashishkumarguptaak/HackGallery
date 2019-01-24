import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(@Inject(Http) public _http, private router: Router) { }

  verify(){
    var Email = localStorage.getItem("Email");
    this._http.post('http://localhost:1818/verify', {email:Email}).subscribe(result => {
        if(result._body === "Verified successfully."){
          localStorage.removeItem("OTP");
          localStorage.removeItem("Email");
          this.router.navigate(['home']);
        }
    });
  }
}
