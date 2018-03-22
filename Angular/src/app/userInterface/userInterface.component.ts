import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userInterface',
  templateUrl: './userInterface.component.html',
  styleUrls: ['./userInterface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  title = 'Who or what you want to find?';

  constructor() { }

  ngOnInit() {
  }

} 
