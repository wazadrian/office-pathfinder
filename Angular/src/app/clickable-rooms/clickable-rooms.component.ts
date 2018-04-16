import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-rooms]',
  templateUrl: './clickable-rooms.component.html',
  styleUrls: ['./clickable-rooms.component.css']
})
export class ClickableRoomsComponent implements OnInit {

  roomClicked : string;
  prevEventSrcID : string;
  prevElement : Element;
  placeClicked : string;
  doubleClick : boolean = false;
  sillyCheck : boolean = true;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.roomClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 'r' && this.prevElement != null) {
      //console.log("Poprzedni element odczytany data after: " + this.placeClicked);
      this.prevEventSrcID = this.placeClicked;
      this.fadeOut();
    }    
  }

  fadeOut() {
    this.prevElement.removeAttribute("class");
    this.prevElement.setAttribute("class", "st15");
  }

  letMeShine() {
    event.srcElement.removeAttribute("class");
    event.srcElement.setAttribute("class", "shining");
  }

  onClick(event : Event) {
    
    this.roomClicked = event.srcElement.id;
    this._data.changeMessage(this.roomClicked);
    //console.log("Poprzedni element odczytany data: " + this.placeClicked);

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
