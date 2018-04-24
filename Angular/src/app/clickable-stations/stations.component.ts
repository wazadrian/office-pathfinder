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

  stationClicked:string;
  prevEventSrcID : string = "";
  lastSearchID: string = "";
  prevElement : Element;
  placeClicked : string;
  doubleClick : boolean = false;
  wasSearching : boolean = false;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.stationClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
    this._data.currentMsgSearch.subscribe(messageSearch => this.wasSearching = messageSearch);
    //this.someInput.nativeElement.class = "shining";
    //var element = document.getElementById('station1');
    //element.setAttribute('class', 'shining');
  }

  ngAfterViewInit() {

  }

  ngAfterContentChecked() {
    if (this.wasSearching ) {
      if (this.prevEventSrcID != "") {
      if (this.prevEventSrcID[0] === 's') 
        document.getElementById(this.prevEventSrcID).setAttribute('class', 'st27');
      }
      document.getElementById(this.placeClicked).setAttribute('class', 'shining');
      this.prevEventSrcID = this.placeClicked;
      this.lastSearchID = this.prevEventSrcID;
    }
    else if (!this.wasSearching && this.lastSearchID != "") {
      document.getElementById(this.lastSearchID).setAttribute('class', 'st27');
    }


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

    this._data.changeMsgSearch(false);

    this.prevEventSrcID = event.srcElement.id;
    this.prevElement = event.srcElement;
  }





}
