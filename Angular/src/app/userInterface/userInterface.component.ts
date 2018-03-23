import { Component, OnInit, Input, AfterContentChecked, SimpleChanges } from '@angular/core';
import { IEmployee } from '../employees/employee';
import { EmployeesService } from '../employees/employees.service';
import { DataService } from "../data.service";

@Component({
  selector: 'app-userInterface',
  templateUrl: './userInterface.component.html',
  styleUrls: ['./userInterface.component.css'],
 
})
export class UserInterfaceComponent implements OnInit, AfterContentChecked {

  title = 'Who or what you want to find?';
  employees: IEmployee[] = [];
  filteredEmployes: IEmployee [];
  showEmployee: boolean = false;
  errorMessage: string;
  stationClicked:string;
  stationNumber:number;



  constructor(private _employeesService: EmployeesService, private _data: DataService) { }

  ngOnInit(): void {
    this.employees = this._employeesService.getEmployees();
    this._data.currentMessage.subscribe(message => this.stationClicked = message);

    
/*
    this._employeesService.getEmployees()
      .subscribe(employees => this.employees = employees,
      error => this.errorMessage = <any>error);
*/
    //this.filteredEmployees
  }

  ngAfterContentChecked() {
    let station;
    station = this.stationClicked.substr(7, 9);
    this.stationNumber = +station;
    console.log(this.stationNumber);
   // this.filterEmoplyees();
  }

 // filterEmoplyees():void{

   //for (let employee of this.employees){
   //   if(employee.employeeId === this.stationNumber){
    //    this.filteredEmployes.push(employee);
    //  }
  // }

 // }

  funkcja(element, index, array):void{
    if(element.employeeId === this.stationNumber){
      this.filteredEmployes += element;
    }
  }


  onClickEmployee(): void {
    this.showEmployee = !this.showEmployee;
  }
  

} 
