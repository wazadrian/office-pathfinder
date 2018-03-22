import { Component, OnInit, Input } from '@angular/core';
import { IEmployee } from '../employees/employee';
import { EmployeesService } from '../employees/employees.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-userInterface',
  templateUrl: './userInterface.component.html',
  styleUrls: ['./userInterface.component.css'],
 
})
export class UserInterfaceComponent implements OnInit {

  title = 'Who or what you want to find?';
  employees: IEmployee[] = [];
  showEmployee: boolean = false;
  errorMessage: string;
  stationClicked:string;

  constructor(private _employeesService: EmployeesService, private _data: DataService) { }

  ngOnInit(): void {
    this.employees = this._employeesService.getEmployees();
    this._data.currentMessage.subscribe(message => this.stationClicked = message)
/*
    this._employeesService.getEmployees()
      .subscribe(employees => this.employees = employees,
      error => this.errorMessage = <any>error);
*/
    //this.filteredEmployees
  }


  onClickEmployee(): void{
    this.showEmployee = !this.showEmployee;
}


} 
