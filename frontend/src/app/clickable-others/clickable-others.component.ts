import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: '[app-clickable-others]',
  templateUrl: './clickable-others.component.html',
  styleUrls: ['./clickable-others.component.css']
})
export class ClickableOthersComponent implements OnInit {

  decisionWC : boolean = false;
  decisionElevator : boolean = false;
  prevWcClicked : boolean = false;
  prevElevatorClicked : boolean = false;


  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentMsgWC.subscribe(wanted => this.decisionWC = wanted);
    this._data.currentMsgElevator.subscribe(wanted => this.decisionElevator = wanted);
  }

  ngAfterContentChecked() {
    if (this.decisionWC) this.letMeShine("wc", "shining");
    else this.fadeOut("wc", "st14");

    if (this.decisionElevator) this.letMeShine("elevator", "shining");
    else this.fadeOut("elevator", "st13");
  }

  fadeOut(id : string, colour : string) {
    var elements = document.getElementsByName(id);
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('class', colour);
    }
  }

  letMeShine(id : string, colour : string) {
    var elements = document.getElementsByName(id);
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('class', colour);
    }
  }

  onClick(event : Event) {
    /*this.fadeOut("wc", "st14");
    //this.decisionWC = false;
    //this._data.changeMsgWC(this.decisionWC);
    if (this.prevWcClicked)
      document.getElementById(event.srcElement.id).setAttribute('class', 'st14');
    else 
      document.getElementById(event.srcElement.id).setAttribute('class', 'shining');
    this.prevWcClicked = true;*/
  }

}
