import { Component, Injector, OnInit } from '@angular/core';

import { ClickableItemComponent } from '../clickable-item.component';

@Component({
  selector: 'app-conference-rooms',
  templateUrl: './conference-rooms.component.html',
  styleUrls: ['./conference-rooms.component.css']
})
export class ConferenceRoomsComponent extends ClickableItemComponent implements OnInit {

  constructor( private injector: Injector) {
    super(injector); 
 }
}
