import { Injectable } from '@angular/core';
import { IMAGE_TEMS } from './images/images';
import { ImageItem } from './images/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor (){}

    getImageItems() {
        return IMAGE_TEMS;
    }

    addImageItem(imageItem: ImageItem) {
      IMAGE_TEMS.push(imageItem);
  }

  addImageItems(imageItems: ImageItem[]){
    IMAGE_TEMS.splice(0);
    for(let imageItem of imageItems)
    IMAGE_TEMS.push(imageItem);
  }
}
