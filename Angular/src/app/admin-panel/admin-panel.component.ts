import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { PanelService } from './panel.service';

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

  constructor(private authService: AuthService, private panelService: PanelService) { }

  ngOnInit() {
  }


  onLogout() {
    this.authService.logout();
  }

  onAddEmployee() {
    this.showAddEmployee = !this.showAddEmployee;
    this.showAddGuest = false;
    this.showSetPlace = false;
    this.boxChecked = false;
  }
  //addEmployee(name, scnd, position, place) {form: NgForm
  addEmployee(form: NgForm) {
    console.log(form.value.first + " "+ form.value.last + " " + form.value.position + " " + form.value.place);
    form.reset();
  //  this.panelService.addEmployeeDB(form.value.first, form.value.last, form.value.position, form.value.place);
  }

  onAddGuest() {
    this.showAddGuest = !this.showAddGuest;
    this.showAddEmployee = false;
    this.showSetPlace = false;
    this.boxChecked = false;
  }

  onSetPlace() {
    this.showSetPlace = !this.showSetPlace;
    this.showAddGuest = false;
    this.showAddEmployee = false;
    this.boxChecked = false;
  }

  onBox(value : boolean) {
    this.boxChecked = value;
  }

  isDisabled() : boolean{
    return !this.boxChecked;
  }

}
