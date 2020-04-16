import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-breadcrump',
  templateUrl: './breadcrump.component.html',
  styleUrls: ['./breadcrump.component.scss']
})
export class BreadcrumpComponent implements OnInit {
  @ViewChild('crumpBottom', {static: true}) crumpBottom :ElementRef;

  @Input("navText") navText:string = " ";
  
  @Input("crump") crump:string = " ";

  @Input("buttomMarginLeft") buttomMarginLeft:string = "0px";

  constructor(private renderer :Renderer2) {
   }

  ngOnInit() {
     this.renderer.setStyle(this.crumpBottom.nativeElement,"margin-left",this.buttomMarginLeft);
  }

}
