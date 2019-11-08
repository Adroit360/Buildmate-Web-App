import { Component, OnInit } from '@angular/core';
import { DataStore } from 'src/Services/dataStore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchWord:string;
  constructor(public dataStore:DataStore,private router:Router) { }

  ngOnInit() {

  }

  search(){
    this.router.navigate(["/search","word",this.searchWord]);
  }
}
