import { Component, OnInit, Output, EventEmitter, ViewChild,
  AfterViewInit,
  ElementRef , Renderer } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-stations]',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  @ViewChild('someInput') someInput: ElementRef; // dziala

  stationClicked:string;
  prevEventSrcID : string;
  prevElement : Element;
  placeClicked : string;
  doubleClick : boolean = false;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.stationClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
    //this.someInput.nativeElement.class = "shining";
  }

  ngAfterViewInit() {
    //this.someInput.nativeElement.style.color = "red";
   // this.someInput.nativeElement.removeAttribute("class");
   // this.someInput.nativeElement.setAttribute("class", "shining");
    //console.log("alo" + this.someInput.nativeElement.id);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 's' && this.prevElement != null) {
      //console.log("Poprzedni element odczytany data after: " + this.placeClicked);
      this.prevEventSrcID = this.placeClicked;
      this.fadeOut();
  //    this.someInput.nativeElement.class = "shining";
    }    
  }

  fadeOut() {
    this.prevElement.removeAttribute("class");
    this.prevElement.setAttribute("class", "st27");
  }

  letMeShine() {
    event.srcElement.removeAttribute("class");
    event.srcElement.setAttribute("class", "shining");
  }

  onClick(event : Event) {
    
    //console.log(event.srcElement.id);
    this.stationClicked = event.srcElement.id;
    this._data.changeMessage(this.stationClicked);

    if (this.prevEventSrcID === event.srcElement.id && !this.doubleClick) {
      this.fadeOut();
      this.doubleClick = true;
    } else {
      if (this.prevEventSrcID != event.srcElement.id && this.prevElement != null) {
        //console.log("Poprzedni element odczytany: " + this.prevElement.id);
        this.fadeOut();
      }
      this.doubleClick = false;
      this.letMeShine();
    }

    this.prevEventSrcID = event.srcElement.id;
    this.prevElement = event.srcElement;
  }





}
