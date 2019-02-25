import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { DataService } from "../data.service";
import { ApiService } from '../api.service';
import { StationModel } from '../models/station.model';

@Component({
  selector: '[app-stations]',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stationClicked: string;
  prevStationClicked: string = "";
  prevEventSrcID: string = "";
  lastSearchID: string = "";
  placeClicked: string;
  doubleClick: boolean = false;
  wasSearching: boolean = false;
  buttonsIDs: string[] = ["buttonSearchSlide", "buttonWC", "buttonElev", "buttonWater", "buttonFire", "buttonCoffee", "buttonAid",
    "buttonPrinter", 'buttonEat', "buttonInfo", 'buttonBed', "buttonActive", "buttonHealth"];
  stations: StationModel[] = [];
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
    let empty = false;
    let prevEmpty = false;
    this.stations.forEach(element => {
      if (element.employeeId == null && element.guestId == null) {
        document.getElementById(element.stationId).setAttribute('class', 'shadow');
        if (this.placeClicked != "" && element.stationId == this.placeClicked) { empty = true; }
        if (this.prevEventSrcID != "" && element.stationId == this.prevEventSrcID) { prevEmpty = true; }
      }
    });
    console.log('Stacja prev: ' + this.prevStationClicked + ' click: ' + this.stationClicked + ' was: ' + this.wasSearching);
    // if ((this.prevEventSrcID[0] === 's' && !this.equalsBtn(this.placeClicked) && !prevEmpty) || (this.placeClicked == "buttonClear" && !prevEmpty)) {
    if (this.prevEventSrcID[0] === 's' && (!this.equalsBtn(this.placeClicked) || this.placeClicked == 'buttonClear') && !prevEmpty) {
      console.log('fade ' + this.prevEventSrcID);
      this.fadeOut(this.prevEventSrcID);
    }
    if (!empty && this.placeClicked != '' && !this.equalsBtn(this.placeClicked) && this.placeClicked != 'buttonClear') {
      this.letMeShine(this.placeClicked);
      console.log('shine ' + this.placeClicked);
    }
    this.prevEventSrcID = this.placeClicked;
    this.lastSearchID = this.placeClicked;
  }

  fadeOut(id: string) {
    document.getElementById(id).setAttribute('class', 'st27');
  }

  letMeShine(id: string) {
    document.getElementById(id).setAttribute('class', 'shining');
  }

  onClick(event: Event) {

    this.stationClicked = event.srcElement.id;
    this._data.changeMessage(this.stationClicked);
  }

  equalsBtn(a: string): boolean {
    let pom = false;
    this.buttonsIDs.forEach(element => {
      if (element === a) { pom = true; }
    });
    return pom;
  }


}
