import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-offices]',
  templateUrl: './clickable-offices.component.html',
  styleUrls: ['./clickable-offices.component.css']
})
export class ClickableOfficesComponent implements OnInit {

  officeClicked:string;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMessage.subscribe(message => this.officeClicked = message)
  }

  onClick(event : Event) {
    
    console.log(event.srcElement.id);
    this.officeClicked = event.srcElement.id;
    this._data.changeMessage(this.officeClicked);

  }

}
