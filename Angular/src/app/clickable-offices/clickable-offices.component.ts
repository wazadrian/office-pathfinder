import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-offices]',
  templateUrl: './clickable-offices.component.html',
  styleUrls: ['./clickable-offices.component.css']
})
export class ClickableOfficesComponent implements OnInit {

  officeClicked : string;
  prevOfficeClicked : string = "";
  prevEventSrcID : string;
  placeClicked : string;
  doubleClick : boolean = false;
  buttonsIDs: string [] = ["buttonSearchSlide", "buttonWC", "buttonElev", "buttonWater", "buttonFire", "buttonCoffee", "buttonAid", 
                        "buttonPrinter", "buttonEat", "buttonInfo", "buttonBed", "buttonActive", "buttonHealth"]; 
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.officeClicked = message)
    this._data.currentMessage.subscribe(message => this.placeClicked = message);

  }

  ngAfterContentChecked() {
    if (this.placeClicked[0] != 'o' && this.prevOfficeClicked != "" && !this.equalsBtn(this.placeClicked)) {
      //console.log("Poprzedni element odczytany data after: " + this.placeClicked);
      this.prevEventSrcID = this.placeClicked;
      this.fadeOut(this.prevOfficeClicked);
    }    
  }

  fadeOut(id : string) {
    document.getElementById(id).setAttribute('class', 'st16');
  }

  letMeShine(id : string) {
    document.getElementById(id).setAttribute('class', 'shining');
  }

  onClick(event : Event) {
    
    this.officeClicked = event.srcElement.id;
    this._data.changeMessage(this.officeClicked);


    if (this.prevEventSrcID === event.srcElement.id && !this.doubleClick) {
      this.fadeOut(this.prevOfficeClicked);
      this.doubleClick = true;
    } else {
      if (this.prevEventSrcID != event.srcElement.id && this.prevOfficeClicked != "") {
        this.fadeOut(this.prevOfficeClicked);
      }
      this.doubleClick = false;
      this.letMeShine(this.officeClicked);
    }
    this.prevEventSrcID = event.srcElement.id;
    this.prevOfficeClicked = event.srcElement.id;

  }

  equalsBtn(a : string) : boolean {
    let pom = false;
    this.buttonsIDs.forEach(element => {
      if (element === a) pom = true;       
    });
    return pom;
  }

}
