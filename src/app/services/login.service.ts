import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(Http) public _http, private router: Router) { }

  userlogin(logindata){
    this._http.post('http://localhost:1818/login',logindata).subscribe(res => {
      var result = JSON.parse(res._body);
      if(result.status === "true"){
        localStorage.setItem("Name",result.data.name);
        localStorage.setItem("Email", result.data.email);
        localStorage.setItem("Password",result.data.password);
        localStorage.setItem("City",result.data.city);
        localStorage.setItem("State",result.data.state);
        localStorage.setItem("Education",result.data.education);
        localStorage.setItem("ProfileImage",result.data.profileimage);
        localStorage.setItem("Date", result.data.date);
        this.router.navigate(['home']);
      }else {
        console.log("Login Service");
        console.log(result);
      }
    })
  }

  userlogout(){
        localStorage.removeItem("Name");
        localStorage.removeItem("Email");
        localStorage.removeItem("Password");
        localStorage.removeItem("City");
        localStorage.removeItem("State");
        localStorage.removeItem("Education");
        localStorage.removeItem("ProfileImage");
        localStorage.removeItem("Date");
    this.router.navigate(['home']);
  }
}
