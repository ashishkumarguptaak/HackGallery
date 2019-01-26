import { Injectable } from '@angular/core';
import { PDF_ITEMS } from './PDF/pdfs';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor (){}

    getPdfItems() {
        return PDF_ITEMS;
    }


  addPdfItems(pdfItems){
    PDF_ITEMS.splice(0);
    console.log("Adding PDFItems");
    for(let pdfItem of pdfItems){
      console.log("For: "+pdfItem.name)
      PDF_ITEMS.push(pdfItem);
    }
  }
}
