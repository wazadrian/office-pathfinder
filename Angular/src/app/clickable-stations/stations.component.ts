import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef , Renderer } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from "../data.service";
import { IStation } from "./station";
import { ApiService } from '../api.service';

@Component({
  selector: '[app-stations]',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stationClicked : string;
  prevStationClicked : string = "";
  prevEventSrcID : string = "";
  lastSearchID: string = "";
  placeClicked : string;
  doubleClick : boolean = false;
  wasSearching : boolean = false;
  buttonsIDs: string [] = ["buttonSearchSlide", "buttonWC", "buttonElev", "buttonWater", "buttonFire", "buttonCoffee", "buttonAid",
                        "buttonPrinter", "buttonEat", "buttonInfo", "buttonBed", "buttonActive", "buttonHealth"];
  stations: IStation[] = [];
  constructor(private _apiService: ApiService, private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.stationClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
    this._data.currentMsgSearch.subscribe(messageSearch => this.wasSearching = messageSearch);
    this._apiService.getStation().subscribe(stat => this.stations = stat);
  }

  ngAfterViewInit() {
  }

  ngAfterContentChecked() {
    this.stations.forEach(element => {
      if (element.employeeId === null && element.guestId === null) {
        document.getElementById(element.stationId).setAttribute('class', 'shadow');
      }
    });

    console.log("prev: " + this.prevStationClicked + " click: " + this.stationClicked + " was: " + this.wasSearching);
    if (this.wasSearching ) {
      if (this.prevEventSrcID != "") {
        if (this.prevEventSrcID[0] === 's' && !this.equalsBtn(this.placeClicked))
          this.fadeOut(this.prevEventSrcID);
      }
      this.letMeShine(this.placeClicked);
      this.prevEventSrcID = this.placeClicked;
      this.lastSearchID = this.prevEventSrcID;
    }
    else if (!this.wasSearching && this.lastSearchID != "" && !this.equalsBtn(this.placeClicked)) {
     this.fadeOut(this.lastSearchID);
    }

    if (this.placeClicked[0] != 's' && this.prevStationClicked != "" && !this.equalsBtn(this.placeClicked)) {
      this.prevEventSrcID = this.placeClicked;
      this.fadeOut(this.prevStationClicked);
    }
  }

  fadeOut(id : string) {
    document.getElementById(id).setAttribute('class', 'st27');
  }

  letMeShine(id : string) {
    document.getElementById(id).setAttribute('class', 'shining');
  }

  onClick(event : Event) {

    this.stationClicked = event.srcElement.id;
    this._data.changeMessage(this.stationClicked);

    if (this.prevEventSrcID === event.srcElement.id && !this.doubleClick) {
      this.fadeOut(this.prevStationClicked);
      this.doubleClick = true;
    } else {
      if (this.prevEventSrcID != event.srcElement.id && this.prevStationClicked != "") {
        this.fadeOut(this.prevStationClicked);
      }
      this.doubleClick = false;
      this.letMeShine(this.stationClicked);
    }

    this._data.changeMsgSearch(false);

    this.prevEventSrcID = event.srcElement.id;
    this.prevStationClicked = event.srcElement.id;
  }

  equalsBtn(a : string) : boolean {
    let pom = false;
    this.buttonsIDs.forEach(element => {
      if (element === a) pom = true;
    });
    return pom;
  }


}
