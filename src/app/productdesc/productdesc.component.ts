import { Component, OnInit } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/Models/product';

@Component({
  selector: 'app-productdesc',
  templateUrl: './productdesc.component.html',
  styleUrls: ['./productdesc.component.scss']
})
export class ProductdescComponent implements OnInit {

  productId: number;
  product: Product;
  navText:string;
  constructor(public dataStore: DataStore, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.productId = +this.activatedRoute.snapshot.params['productId'];
    this.getProductsFromStore();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.productId = +params['productId'];
      this.getProductsFromStore();
    });
  }

  getProductsFromStore() {
    this.dataStore.getProducts().then(data => {
      this.product = data.filter(i => i.productId == this.productId)[0];
      this.setNavText(this.product.productName);
    })
  }

  setNavText(ProductName) {
    this.navText = ProductName;
  }

  getRandomColor(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  }}
