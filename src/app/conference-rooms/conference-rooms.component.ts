import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conference-rooms',
  templateUrl: './conference-rooms.component.html',
  styleUrls: ['./conference-rooms.component.css']
})
export class ConferenceRoomsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick(event:Event){
    console.log(event.srcElement.id);
  }

}
