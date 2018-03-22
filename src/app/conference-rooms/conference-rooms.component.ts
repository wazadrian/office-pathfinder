import { Component, OnInit , ViewEncapsulation , EventEmitter } from '@angular/core';

@Component({
  selector: '[app-conference-rooms]',
  templateUrl: './conference-rooms.component.html',
  styleUrls: ['./conference-rooms.component.css'],
  /**host: { '(click)': 'onClick()'}**/
})
export class ConferenceRoomsComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
  }

  onClick(event : Event) {

    //console.log(event);
    console.log(event.srcElement.id);

  }
}
