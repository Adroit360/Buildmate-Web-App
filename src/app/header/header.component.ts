import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';
import { Router } from '@angular/router';
import { Category } from 'src/Models/category';
import { ProductCategoryPopupService } from 'src/Services/productCategoryPopup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchWord: string;
  productPopupKey:string = "default";
  isProductPopupShown:boolean = false;
  @ViewChild('productscontainer', {static:true, read: ElementRef }) productsContainer: ElementRef<any>;

  constructor(public dataStore: DataStore, private router: Router) { }

  ngOnInit() {
    console.log("Firstcolor",this.dataStore.categoryColors[0][0]);
  }

  search() {
    this.router.navigate(["/search", "word", this.searchWord]);
  }

  /**
   * productscontainer
   */
  scrollLeft(container){
    this.sideScroll('left',container)
  }
  scrollRight(container){
    this.sideScroll('right',container)

  }

  sideScroll(direction,element,speed = 50, distance = 200, step = 100) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction == 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  showProductCategoryModal(popupKey:string){
    this.router.navigate(["/search", "word", popupKey],{queryParams:{isprodcat:true}});
  }


}
