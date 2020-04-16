import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProductCategoryPopupService } from 'src/Services/productCategoryPopup.service';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss']
})
export class ProductPopupComponent implements OnInit {

  constructor(public domSanitizer:DomSanitizer,public prodCatPopup:ProductCategoryPopupService) { }

  ngOnInit() {  
    
  }





}
