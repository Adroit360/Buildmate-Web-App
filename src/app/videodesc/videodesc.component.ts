import { Component, OnInit } from '@angular/core';
import { Video } from 'src/Models/video';
import { DataStore } from 'src/Services/dataStore';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videodesc',
  templateUrl: './videodesc.component.html',
  styleUrls: ['./videodesc.component.scss']
})
export class VideodescComponent implements OnInit {

  videoId: number;
  video: Video;
  navText:string;
  vidUrl:SafeResourceUrl;
  constructor(public dataStore: DataStore, private activatedRoute: ActivatedRoute,public sanitizer:DomSanitizer) {

  }

  ngOnInit() {
    this.videoId = +this.activatedRoute.snapshot.params['videoId'];
    this.getVideosFromStore();
    
    this.activatedRoute.params.subscribe((params: Params) => {
      this.videoId = +params['videoId'];
      this.getVideosFromStore();
    });
  }

  getVideosFromStore() {
    this.dataStore.getVideos().then(data => {
      this.video = data.filter(i => i.videoId == this.videoId)[0];
      this.vidUrl = this.sanitizer.bypassSecurityTrustHtml(this.video.videoUrl);
      this.setNavText(this.video.videoName);
    })
  }

  setNavText(VideoName) {
    this.navText = VideoName;
  }

}
