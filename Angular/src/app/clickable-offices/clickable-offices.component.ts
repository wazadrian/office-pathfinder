import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-offices]',
  templateUrl: './clickable-offices.component.html',
  styleUrls: ['./clickable-offices.component.css']
})
export class ClickableOfficesComponent implements OnInit {

  officeClicked:string;
  prevEventSrcID : string;
  prevElement : Element;
  placeClicked : string;
  doubleClick : boolean = false;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.officeClicked = message)
    this._data.currentMessage.subscribe(message => this.placeClicked = message);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 'o' && this.prevElement != null) {
      //console.log("Poprzedni element odczytany data after: " + this.placeClicked);
      this.prevEventSrcID = this.placeClicked;
      this.fadeOut();
    }    
  }

  fadeOut() {
    this.prevElement.removeAttribute("class");
    this.prevElement.setAttribute("class", "st16");
  }

  letMeShine() {
    event.srcElement.removeAttribute("class");
    event.srcElement.setAttribute("class", "shining");
  }

  onClick(event : Event) {
    
    console.log(event.srcElement.id);
    this.officeClicked = event.srcElement.id;
    this._data.changeMessage(this.officeClicked);


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
