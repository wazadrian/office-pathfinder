import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-others]',
  templateUrl: './clickable-others.component.html',
  styleUrls: ['./clickable-others.component.css']
})
export class ClickableOthersComponent implements OnInit {

  wantToOtersShine : boolean = false;
  decisionWC : boolean = false;
  decisionElevator : boolean = false;


  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMsg.subscribe(wanted => this.wantToOtersShine = wanted);
    this._data.currentMsgElevator.subscribe(wanted => this.decisionElevator = wanted);
  }

  ngAfterContentChecked() {
    this.decisionWC = this.wantToOtersShine;
   // console.log("others " + this.decisionWC);
  }

}
