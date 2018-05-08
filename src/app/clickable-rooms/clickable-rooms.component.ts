import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-rooms]',
  templateUrl: './clickable-rooms.component.html',
  styleUrls: ['./clickable-rooms.component.css']
})
export class ClickableRoomsComponent implements OnInit {

  roomClicked : string;
  prevRoomClicked : string = "";
  prevEventSrcID : string;
  placeClicked : string;
  doubleClick : boolean = false;
  buttonsIDs: string [] = ["buttonSearchSlide", "buttonWC", "buttonElev", "buttonWater", "buttonFire", "buttonCoffee", "buttonAid", 
                        "buttonPrinter", "buttonEat", "buttonInfo", "buttonBed", "buttonActive", "buttonHealth"]; 

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.roomClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 'r' && this.prevRoomClicked != "" && !this.equalsBtn(this.placeClicked)) {
      //console.log("Poprzedni element odczytany data after: " + this.placeClicked);
      this.prevEventSrcID = this.placeClicked;
      this.fadeOut(this.prevRoomClicked);
    }    
  }

  fadeOut(id : string) {
    document.getElementById(id).setAttribute('class', 'st15');
  }

  letMeShine(id : string) {
    document.getElementById(id).setAttribute('class', 'shining');
  }

  onClick(event : Event) {
    
    this.roomClicked = event.srcElement.id;
    this._data.changeMessage(this.roomClicked);

    if (this.prevEventSrcID === event.srcElement.id && !this.doubleClick) {
      this.fadeOut(this.prevRoomClicked);
      this.doubleClick = true;
    } else {
      if (this.prevEventSrcID != event.srcElement.id && this.prevRoomClicked != "") {
        this.fadeOut(this.prevRoomClicked);
      }
      this.doubleClick = false;
      this.letMeShine(this.roomClicked);
    }

    this.prevEventSrcID = event.srcElement.id;
    this.prevRoomClicked = event.srcElement.id;

  }

  equalsBtn(a : string) : boolean {
    let pom = false;
    this.buttonsIDs.forEach(element => {
      if (element === a) pom = true;       
    });
    return pom;
  }

}
