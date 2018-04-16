import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-stations]',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stationClicked:string;
  prevEventSrcID : string;
  prevElement : Element;
  placeClicked : string;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.stationClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 's' && this.prevElement != null) {
      console.log("Poprzedni element odczytany data after: " + this.placeClicked);
      this.fadeOut();
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

    if (this.prevEventSrcID != event.srcElement.id && this.prevElement != null) {
        //console.log("Poprzedni element odczytany: " + this.prevElement.id);
        this.fadeOut();
    }

    this.letMeShine();

    this.prevEventSrcID = event.srcElement.id;
    this.prevElement = event.srcElement;
  }





}
