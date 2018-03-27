import { Component, OnInit, Injector } from '@angular/core';

import { ClickableItemComponent } from '../clickable-item.component';

@Component({
  selector: '[app-stations]',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent extends ClickableItemComponent implements OnInit {
  constructor( private injector: Injector) {
    super(injector); 
 }
}
