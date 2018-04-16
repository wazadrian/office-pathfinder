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
  sillyCheck : boolean = true;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.roomClicked = message);
    this._data.currentMessage.subscribe(message => this.placeClicked = message);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 'r' && this.prevElement != null) {
      console.log("Poprzedni element odczytany data after: " + this.placeClicked);
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
    if (this.placeClicked != null) {
        
      if (this.prevEventSrcID != event.srcElement.id && this.prevElement != null) {
            //console.log("Poprzedni element odczytany lok: " + this.prevElement.id);
            this.fadeOut();
      }

      this.letMeShine();

      this.prevEventSrcID = event.srcElement.id;
      this.prevElement = event.srcElement;
    }
    else {
      this.fadeOut();
    }
    //console.log("Poprzedni element zapisany: " + this.prevElement.id);

  }

}
