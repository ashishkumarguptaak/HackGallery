import { Injectable } from '@angular/core';
import { HOME_PDF_ITEMS } from '../home/HOMEPDF/homepdfs';

@Injectable({
  providedIn: 'root'
})
export class UniversalPDFService {

  constructor (){}

    getPdfItems() {
        return HOME_PDF_ITEMS;
    }


  addPdfItems(pdfItems){
    HOME_PDF_ITEMS.splice(0);
    console.log("Adding PDFItems");
    for(let pdfItem of pdfItems){
      console.log("For: "+pdfItem.name)
      HOME_PDF_ITEMS.push(pdfItem);
    }
  }
}
