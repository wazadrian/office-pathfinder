import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-stations]',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stationClicked:string;
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.stationClicked = message)
  }

  onClick(event : Event) {
    
    console.log(event.srcElement.id);
    this.stationClicked = event.srcElement.id;
    this._data.changeMessage(this.stationClicked);

  }





}
