import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UpdateprofileService {

  constructor(@Inject(Http) public _http, private router: Router) { }

  update(profiledata){
    this._http.post('http://localhost:1818/update',profiledata).subscribe(result=>{
      if(result._body === "Something went wrong.")
      console.log(result._body);
      else{
        localStorage.setItem("Name",profiledata.name);
        localStorage.setItem("Email", profiledata.email);
        localStorage.setItem("Password",profiledata.password);
        localStorage.setItem("City",profiledata.city);
        localStorage.setItem("State",profiledata.state);
        localStorage.setItem("Education",profiledata.education);
        localStorage.setItem("ProfileImage",profiledata.profileimage);
        this.router.navigate(['profile']);
        console.log(result._body);
      }
    });
  }
}
