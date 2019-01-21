import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(@Inject(Http) public _http) { }

  contactmail(emaildata){
    this._http.post('http://localhost:1818/addcontactemail',emaildata).subscribe(result=>{
      console.log(result);
    });
  }
}
