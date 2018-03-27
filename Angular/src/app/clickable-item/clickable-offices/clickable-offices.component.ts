import { Component, OnInit, Injector } from '@angular/core';
import { ClickableItemComponent } from '../clickable-item.component';

@Component({
  selector: '[app-clickable-offices]',
  templateUrl: './clickable-offices.component.html',
  styleUrls: ['./clickable-offices.component.css']
})
export class ClickableOfficesComponent extends ClickableItemComponent implements OnInit {
  constructor( private injector: Injector) {
    super(injector); 
 }
}
