import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-rooms]',
  templateUrl: './clickable-rooms.component.html',
  styleUrls: ['./clickable-rooms.component.css']
})
export class ClickableRoomsComponent implements OnInit {

  roomClicked:string;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.roomClicked = message)
  }

  onClick(event : Event) {
    
    console.log(event.srcElement.id);
    this.roomClicked = event.srcElement.id;
    this._data.changeMessage(this.roomClicked);

  }


}
