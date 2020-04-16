import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DataStore } from 'src/Services/dataStore';
import { HttpClient } from '@angular/common/http';
import { settings } from 'src/settings';
import { Product } from 'src/Models/product';
import { Video } from 'src/Models/video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarousel]
})
export class HomeComponent implements OnInit {

  newProducts: Product[];
  latestVideos: Video[];
  images = [ "../../assets/buildmate/banners/6.jpg", "../../assets/buildmate/banners/3.jpg","../../assets/buildmate/banners/1.jpg"]
  constructor(public dataStore: DataStore, public httpClient: HttpClient) {
    this.getNewProducts();
    this.getVideosFromDataStore();
  }

  ngOnInit() {
  }

  getNewProducts() {

    return this.dataStore.getProducts().then(data => {
      this.newProducts = []
        var randomIndex = this.getRandomIndex(data);
        if (randomIndex > 8)
        randomIndex -= 9;
        this.newProducts.push(...data.slice(randomIndex,randomIndex+10));
    })
  }

  getRandomIndex(items) {
    return Math.floor(Math.random() * items.length);
  }

  getVideosFromDataStore() {
    this.latestVideos = [];
    this.dataStore.getVideos().then(response => {
        var random = this.getRandomIndex(response);

        if (random > 2)
          random -= 3;

        this.latestVideos.push(...response.slice(random,random + 4));
    })
  }

}
