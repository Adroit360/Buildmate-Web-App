import { Component, OnInit } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productdesc',
  templateUrl: './productdesc.component.html',
  styleUrls: ['./productdesc.component.scss']
})
export class ProductdescComponent implements OnInit {

  productName:string;
  constructor(public dataStore: DataStore, private activatedRoute: ActivatedRoute,private httpClient:HttpClient) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productName = params['productName'];

     //this.httpClient.get()
    });
  }

}
