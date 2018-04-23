import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-others]',
  templateUrl: './clickable-others.component.html',
  styleUrls: ['./clickable-others.component.css']
})
export class ClickableOthersComponent implements OnInit {

  wantToWcShine : boolean = false;
  wantToElevShine : boolean = false;
  decisionWC : boolean = false;
  decisionElevator : boolean = false;


  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMsg.subscribe(wanted => this.decisionWC = wanted);
    this._data.currentMsgElevator.subscribe(wanted => this.decisionElevator = wanted);
  }

  ngAfterContentChecked() {
    
  }

}
