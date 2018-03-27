import { Component, Injector, OnInit } from '@angular/core';

import { ClickableItemComponent } from '../clickable-item.component';

@Component({
  selector: '[app-clickable-rooms]',
  templateUrl: './clickable-rooms.component.html',
  styleUrls: ['./clickable-rooms.component.css']
})
export abstract class ClickableRoomsComponent extends ClickableItemComponent implements OnInit{
  constructor( private injector: Injector) {
    super(injector); 
 }
}
