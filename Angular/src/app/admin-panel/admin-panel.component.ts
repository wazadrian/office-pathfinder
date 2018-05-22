import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  showAddEmployee : boolean = false;
  showAddGuest : boolean = false;
  showSetPlace : boolean = false;
  boxChecked : boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  onLogout() {
    this.authService.logout();
  }

  onAddEmployee() {
    this.showAddEmployee = !this.showAddEmployee;
  }
  addEmployee(name, scnd, position, box) {
    console.log(name + " "+ scnd + " " + position + " " + box);
  }

  onAddGuest() {
    this.showAddGuest = !this.showAddGuest;
  }

  onSetPlace() {
    this.showSetPlace = !this.showSetPlace;
  }

  onBox(value : boolean) {
    this.boxChecked = value;
  }

}
