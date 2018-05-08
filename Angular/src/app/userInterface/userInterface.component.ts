import { Component, OnInit, Input, AfterContentChecked, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IEmployee } from '../employees/employee';
import { ApiService } from '../api.service';
import { DataService } from "../data.service";
import { equal } from 'assert';
import { IOffice } from '../clickable-offices/office';
import { IConferenceRoom } from '../conference-rooms/conferenceRoom';
import { IRoom } from '../clickable-rooms/room';
import { IStation } from '../clickable-stations/station';
import { IGuest } from '../guests/guest';

@Component({
  selector: 'app-userInterface',
  templateUrl: './userInterface.component.html',
  styleUrls: ['./userInterface.component.css'],
 
})


export class UserInterfaceComponent implements OnInit, AfterContentChecked {

  @ViewChild('searchInput', {read: ElementRef}) searchInput: ElementRef;

  title = 'Who or what you want to find?';
  employees: IEmployee[] = [];
  offices: IOffice[] = [];
  conferenceRooms: IConferenceRoom[] = [];
  rooms: IRoom[] = [];
  stations: IStation[] = [];
  guests: IGuest[] = [];
  filteredEmployes: IEmployee [];
  foundEmployee: IEmployee;
  showEmployee: boolean = false;

  sillyChange: boolean = false;
  errorMessage: string;
  placeClicked:string;
  placeNumber:number;
  wantToWCShine : boolean = false;
  wantToElevatorShine : boolean = false;
  wantToWaterShine : boolean = false;
  wantToFireShine : boolean = false;
  wantToCoffeeShine : boolean = false;
  wantToAidShine : boolean = false;
  wantToPrinterShine : boolean = false;
  wantToEatShine : boolean = false;
  wantToInfoShine : boolean = false;
  wantToBedShine : boolean = false;
  wantToActiveShine : boolean = false;
  wantToHealthShine : boolean = false;
  shySearchCheck : boolean = false;
  
  showSearchDiv : boolean = false;
  buttonWasClicked : boolean = true;
  btnIdSearchSlide : string = "buttonSearchSlide";
  btnIdWC : string = "buttonWC";
  btnIdElevator : string = "buttonElev";
  dataForSearch : string;


  constructor(private _apiService: ApiService, private _data: DataService) { }

  ngOnInit(): void {
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
   // this._data.currentMsgSearch.subscribe(wanted => this.shySearchCheck = wanted);

    this._apiService.getEmployees()
      .subscribe(employees => this.employees = employees,
      error => this.errorMessage = <any>error);

    this._apiService.getConferenceRoom()
      .subscribe(conferenceRooms => this.conferenceRooms = conferenceRooms,
      error => this.errorMessage = <any>error);

    this._apiService.getOffice()
      .subscribe(offices => this.offices = offices,
      error => this.errorMessage = <any>error);

    this._apiService.getRoom()
      .subscribe(rooms => this.rooms = rooms,
      error => this.errorMessage = <any>error);

    this._apiService.getStation()
      .subscribe(stations => this.stations = stations,
      error => this.errorMessage = <any>error);

    this._apiService.getGuest()
      .subscribe(guests => this.guests = guests,
      error => this.errorMessage = <any>error);

  }

  ngAfterContentChecked() {
    this.filterPlace();
   // this.shySearchCheck = false;
    //this.dataForSearch = "";
    this.sillyChange = !this.sillyChange;
   // if (this.placeClicked != "buttonSearchSlide")
    //this.showSearchDiv = false;

    if (this.placeClicked[0] != 's') {
      this.shySearchCheck = false;
      this._data.changeMsgSearch(this.shySearchCheck);
    }

    
    if (!this.equalsBtn(this.placeClicked)) {
      this.buttonWasClicked = false;
      this.shySearchCheck = false;
      if (this.placeClicked != "buttonWC") {
        this.wantToWCShine = false;
        this._data.changeMsg(this.wantToWCShine);
      }
      if (this.placeClicked != "buttonElev") {
        this.wantToElevatorShine = false;
        this._data.changeMsg(this.wantToElevatorShine);
      }
    }
    else this.buttonWasClicked = true;
     

    this._data.changeMsg(this.wantToWCShine);
    this._data.changeMsgElevator(this.wantToElevatorShine);

    /*if (this.dataForSearch != "") {
    this.filteredEmployes = this.employees.filter((employee: IEmployee) =>
    employee.employeeSurname ===this.dataForSearch);
    }*/

    //filtrowanie by jedna osoba sie wyswietlala
    this.filteredEmployes = this.employees.filter((employee: IEmployee) =>
    employee.employeeId ===this.placeNumber);
    
  }

  ngAfterViewInit() {
    //console.log(this.searchInput.nativeElement);
  }

  equalsBtn(a : string) : boolean {
      if (a === this.btnIdSearchSlide || a === this.btnIdWC || a === this.btnIdElevator
          ||a === "buttonWater" ||a === "buttonFire"||a === "buttonCoffee"
          ||a === "buttonAid" ||a === "buttonPrinter"||a === "buttonEat"
          ||a === "buttonInfo" ||a === "buttonBed"||a === "buttonActive"
          ||a === "buttonHealth") return true; 
      else return false;
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

  onClickSearchSlide(event : Event): void {
    //this.showEmployee = !this.showEmployee;
    this._data.changeMessage(event.srcElement.id);
    this.showSearchDiv = !this.showSearchDiv;
  }

  onClickSearch(inputData : string): void {
    if (inputData) {
     // this.shySearchCheck = !this.shySearchCheck;
      this.dataForSearch = inputData;
      console.log(this.dataForSearch);
      if (this.dataForSearch != "") {
        this.employees.forEach(element => {
          if (this.dataForSearch === element.employeeSurname) {
           // this.placeClicked = element.employeeId.toString();
            this.filteredEmployes = this.employees.filter((employee: IEmployee) =>
            employee.employeeSurname ===this.dataForSearch);
            this.placeClicked = "station" + element.employeeId.toString();
            this._data.changeMessage(this.placeClicked);
            this.shySearchCheck = true;
            this._data.changeMsgSearch(this.shySearchCheck);
          }
         // console.log(this.filteredEmployes[0].employeeId + this.filteredEmployes[0].employeeName);
        });
      } 
     /* else {
        this.shySearchCheck = false;
        this._data.changeMsgSearch(this.shySearchCheck);
      }*/
    }
  }

  onClickElevator(event : Event) {
    this.wantToElevatorShine = !this.wantToElevatorShine;
    this._data.changeMsgElevator(this.wantToElevatorShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickWC(event : Event) {
    this.wantToWCShine = !this.wantToWCShine;
    this._data.changeMsg(this.wantToWCShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickWater(event : Event) {
    this.wantToWaterShine = !this.wantToWaterShine;
    this._data.changeMsgWater(this.wantToWaterShine);
    this._data.changeMessage(event.srcElement.id);
    console.log(event.srcElement.id + " User " + this.wantToWaterShine);
  }

  onClickFire(event : Event) {
    this.wantToFireShine = !this.wantToFireShine;
    this._data.changeMsgFire(this.wantToFireShine);
    this._data.changeMessage(event.srcElement.id);

  }

  onClickCoffee(event : Event) {
    this.wantToCoffeeShine = !this.wantToCoffeeShine;
    this._data.changeMsgCoffee(this.wantToCoffeeShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickAid(event : Event) {
    this.wantToAidShine = !this.wantToAidShine;
    this._data.changeMsgAid(this.wantToAidShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickPrinter(event : Event) {
    this.wantToPrinterShine = !this.wantToPrinterShine;
    this._data.changeMsgPrinter(this.wantToPrinterShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickEat(event : Event) {
    this.wantToEatShine = !this.wantToEatShine;
    this._data.changeMsgEat(this.wantToEatShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickInfo(event : Event) {
    this.wantToInfoShine = !this.wantToInfoShine;
    this._data.changeMsgInfo(this.wantToInfoShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickBed(event : Event) {
    this.wantToBedShine = !this.wantToBedShine;
    this._data.changeMsgBed(this.wantToBedShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickActive(event : Event) {
    this.wantToActiveShine = !this.wantToActiveShine;
    this._data.changeMsgActive(this.wantToActiveShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickHealth(event : Event) {
    this.wantToHealthShine = !this.wantToHealthShine;
    this._data.changeMsgHealth(this.wantToHealthShine);
    this._data.changeMessage(event.srcElement.id);
  }
  

 /* filterEmoplyees():void{
    for (let employee of this.employees){
       if(employee.employeeId == this.stationNumber){
         this.foundEmployee = employee;
       }
     }
   }*/
} 

 