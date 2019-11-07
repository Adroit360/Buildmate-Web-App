import { Component, OnInit } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DataStore } from 'src/Services/dataStore';
import { HttpClient } from '@angular/common/http';
import { settings } from 'src/settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarousel]
})
export class HomeComponent implements OnInit {

  images = ["../../assets/buildmate/banners/1.jpg", "../../assets/buildmate/banners/3.jpg", "../../assets/buildmate/banners/4.jpeg"]
  constructor(public dataStore: DataStore, public httpClient: HttpClient) {
    
  }

  ngOnInit() {
  }

}
