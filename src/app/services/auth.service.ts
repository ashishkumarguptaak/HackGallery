import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  profile: any;

  constructor(@Inject(Http) public _http) { }

  public authenticated(){
    var Email = localStorage.getItem("Email");
    if(Email === null){
      return false;
    }
    else {
      return true;
    }
  }
}
