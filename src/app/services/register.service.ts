import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(@Inject(Http) public _http) { }

  registeruser(userdata){
    this._http.post('http://localhost:1818/registeruser',userdata).subscribe(result=>{
      console.log(result);
    });
  }
}
