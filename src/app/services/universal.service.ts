import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { UniversalPDFService } from './universalpdf.service';

@Injectable({
  providedIn: 'root'
})
export class UniversalService {

  constructor(@Inject(Http) public _http,@Inject(UniversalPDFService) public universalpdfservice) { }
  


  universalpdf(){
    this._http.post('http://localhost:1818/universalpdf').subscribe(result=>{
      if (result._body === "false"){
        console.log("No pdfs.");
      }else {
        console.log("Fetched PDFs.");
        var data = JSON.parse((result._body));
        this.universalpdfservice.addPdfItems(data);
      }
    });
  }

  universalSearch(searchdata){
    this._http.post('http://localhost:1818/universalsearch',searchdata).subscribe(result=>{
    if(result._body === "false"){
      console.log("Book not found.")
    }else{
      console.log("Searched PDFs.");
      var data = JSON.parse((result._body));
      this.universalpdfservice.addPdfItems(data);
    }
    });
  }
}
