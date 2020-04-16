import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductCategoryPopupService {
    isShown: Boolean = false;

    set popupKey(value){
        console.log("ProductCategoryPopupService",value);
        this.getProductCategoryLink(value);
    }

    productCategoryLink: SafeResourceUrl;

    constructor(private domSanitizer:DomSanitizer){

    }

    getProductCategoryLink(key) {
        this.productCategoryLink = this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/prodCategories/' + key + '.html');
        console.log("productCategoryLink",this.productCategoryLink);
    }
}