import { Component, OnInit } from '@angular/core';
import { Video } from 'src/Models/video';
import { DataStore } from 'src/Services/dataStore';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos:Video[];

  constructor(private dataStore:DataStore) {
    this.getVideosFromDataStore();
   }

  ngOnInit() {

  }

  getVideosFromDataStore(){
    this.dataStore.getVideos().then(response=>{
      this.videos = response;
    })
  }

}
