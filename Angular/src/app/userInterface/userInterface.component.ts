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
  foundEmployee: IEmployee;
  showEmployee: boolean = false;
  sillyChange: boolean = false;
  errorMessage: string;
  placeClicked:string;
  placeNumber:number;
  wantToWCShine : boolean = false;
  wantToElevatorShine : boolean = false;

  constructor(private _employeesService: EmployeesService, private _data: DataService) { }

  ngOnInit(): void {
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
    this._data.currentMsg.subscribe(wanted => this.wantToWCShine = wanted);
    
    this._employeesService.getEmployees()
      .subscribe(employees => this.employees = employees,
      error => this.errorMessage = <any>error);
  }

  ngAfterContentChecked() {
    this.filterPlace();

    this.sillyChange = !this.sillyChange;
    if (this.placeClicked != "buttonWC")
      this.wantToWCShine = false;
    if (this.placeClicked != "buttonElev")
      this.wantToElevatorShine = false;
    this._data.changeMsg(this.wantToWCShine);
    //console.log(this.placeClicked + this.wantToWCShine);
   // let elm = document.getElementById("info");
  //  elm.classList.remove("table animated bounce");
   // elm.classList.add("table animated bounce");

    //filtrowanie by jedna osoba sie wyswietlala
    this.filteredEmployes = this.employees.filter((employee: IEmployee) =>
    employee.employeeId ===this.placeNumber);
    
  }

  filterPlace(){
    let place;
    let str = this.placeClicked.substr(0, 4);

    if( str === "room"){
      place = this.placeClicked.substr(4, 2); //naciśnięty został pokój
    }
    else if( str === "offi"){
      place = this.placeClicked.substr(6, 2); //naciśnięty został office
    }
    else{
      place = this.placeClicked.substr(7, 3); //naciśnięta została stacja
    }


    this.placeNumber = +place;
    console.log(this.placeNumber);
  }

  onClickEmployee(): void {
    this.showEmployee = !this.showEmployee;
  }
  
  onClickWC(event : Event) {
    this.wantToWCShine = !this.wantToWCShine;
    this._data.changeMsg(this.wantToWCShine);
    this._data.changeMessage(event.srcElement.id);
    //console.log(event.srcElement.id + " User " + this.wantToWcShine);
  }

  onClickElevator(event : Event) {
    this.wantToElevatorShine = !this.wantToElevatorShine;
    this._data.changeMsgElevator(this.wantToElevatorShine);
    this._data.changeMessage(event.srcElement.id);
    //console.log(event.srcElement.id + " User " + this.wantToElevatorShine);
  }


} 

 /*filterEmoplyees():void{
   for (let employee of this.employees){
      if(employee.employeeId == this.stationNumber){
        this.foundEmployee = employee;
      }
    }
  }
*/