import { Component, OnInit, Injector } from '@angular/core';
import { DataService } from "../data.service";

export abstract class ClickableItemComponent implements OnInit {
  protected _data: DataService;

  constructor(private injectorObj: Injector) { 
    this._data = this.injectorObj.get(DataService);
  }

  ngOnInit() {
  }

  protected onClick(event : Event) {
    this._data.changeMessage(event.srcElement.id);
  }
}
