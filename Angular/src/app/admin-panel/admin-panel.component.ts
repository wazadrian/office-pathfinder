import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { PanelService } from './panel.service';
import { ApiService } from '../api.service';
import { IEmployee } from '../employees/employee';
import { IGuest } from '../guests/guest';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  selectedEmployeeId: number;
  selectedEmployee: IEmployee;
  showAddEmployee : boolean = false;
  showAddGuest : boolean = false;
  showSetPlace : boolean = false;
  showDeletePlace : boolean = false;
  boxChecked : boolean = false;
  employees : IEmployee [] = [];
  guests : IGuest [] = [];

  constructor(private _apiService: ApiService, private authService: AuthService, private panelService: PanelService) { }

  ngOnInit() {
    this._apiService.getEmployees().subscribe(emp => this.employees = emp);
    this.employees.forEach(element => {
      console.log(element.employeeName);
    });
  }

  addEmployee(form: NgForm) {
    //console.log(form.value.first + " "+ form.value.last + " " + form.value.position + " " + form.value.place);
    // to zakomentowane nizej jest niedzialajace, ale struktura argumentow jest ok chyba
    //this.panelService.addEmployeeDB(form.value.first, form.value.last, form.value.position, form.value.place);

    this.panelService.addEmployeeDB(form.value.first, form.value.last, form.value.position, form.value.place);

    form.reset();
  }



  addGuest(form: NgForm) {
    //console.log(form.value.first + " "+ form.value.last + " " + form.value.position + " " + form.value.place + " " + form.value.dateFrom + " " + form.value.dateTo);
    form.reset();
    // to co w komentarzu wyzej jest do wyslania, przy czym nie wiem w jakiej formie data jest odpowiednia dla bazy
  }

  setSelected(id: number) {
    this.selectedEmployeeId = id;
  }

  setPlace(form: NgForm) {
    let stationID = form.value.place;        // wpisane stationID do dopisania
    this.employees.forEach(element => {
      if (element.employeeId == this.selectedEmployeeId) 
        this.selectedEmployee = element;    // pracownik do dopisania stationID
    });

  }

  deletePlace() {
    this.employees.forEach(element => {
      if (element.employeeId == this.selectedEmployeeId) 
        this.selectedEmployee = element;  // pracownik ktoremu trzeba usunac stationID
    });
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

  onAddGuest() {
    this.showAddGuest = !this.showAddGuest;
    this.showDeletePlace = false;
    this.showAddEmployee = false;
    this.showSetPlace = false;
    this.boxChecked = false;
  }

  onSetPlace() {
    this.showSetPlace = !this.showSetPlace;
    this.showDeletePlace = false;
    this.showAddGuest = false;
    this.showAddEmployee = false;
    this.boxChecked = false;
  }

  onDeletePlace() {
    this.showDeletePlace = !this.showDeletePlace;
    this.showSetPlace = false;
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
