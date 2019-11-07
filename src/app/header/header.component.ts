import { Component, OnInit } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dataStore:DataStore) { }

  ngOnInit() {

  }

  search(){
    console.log("Bankue");
  }
}
