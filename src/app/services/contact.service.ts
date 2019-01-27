import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(@Inject(Http) public _http,private router: Router) { }

  contactmail(emaildata){
    this._http.post('http://localhost:1818/addcontactemail',emaildata).subscribe(result=>{
      console.log(result);
    });
  }

  forgotpassword(){
    var Password = {pass:Math.floor(100000 + Math.random() * 900000)+""};
    this._http.post('/forgotpassword',Password).subscribe(result=>{
      if(result._body === "false"){
        alert("Something went wrong please try again.");
      }else{
        this.router.navigate(['home']);
      }
    })
  }
}
