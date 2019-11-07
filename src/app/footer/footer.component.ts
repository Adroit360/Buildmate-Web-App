import { Component, OnInit } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dataStore:DataStore) { }

  ngOnInit() {
  }

}
