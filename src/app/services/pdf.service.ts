import { Injectable } from '@angular/core';
import { PDFItem } from './PDF/pdf';
import { PDF_ITEMS } from './PDF/pdfs';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor (){}

    getPdfItems() {
        return PDF_ITEMS;
    }

    addPdfItem(pdfItem: PDFItem) {
      PDF_ITEMS.push(pdfItem);
  }

  addPdfItems(pdfItems: PDFItem[]){
    PDF_ITEMS.splice(0);
    for(let pdfItem of pdfItems)
    PDF_ITEMS.push(pdfItem);
  }
}
