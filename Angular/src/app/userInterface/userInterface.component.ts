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
  searchedEmployee :IEmployee = null;
  searchedGuest :IGuest = null;

  foundThing: string = "";

  sillyChange: boolean = false;
  errorMessage: string;
  placeClicked:string;
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
  buttonsIDs: string [] = ["buttonSearchSlide", "buttonWC", "buttonElev", "buttonWater", "buttonFire", "buttonCoffee", "buttonAid", 
                        "buttonPrinter", "buttonEat", "buttonInfo", "buttonBed", "buttonActive", "buttonHealth"];


  constructor(private _apiService: ApiService, private _data: DataService) { }

  ngOnInit(): void {
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
    this.getAll();
  }

  ngAfterContentChecked() {
    this.sillyChange = !this.sillyChange;

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
  }

  getAll(){
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

  equalsBtn(a : string) : boolean {
    let pom = false;
    this.buttonsIDs.forEach(element => {
      if (element === a) pom = true;
    });
    return pom;
  }

  onClickSearchSlide(event : Event): void {
    this._data.changeMessage(event.srcElement.id);
    this.showSearchDiv = !this.showSearchDiv;
  }

  onClickSearch(inputData : string): void {
      console.log(inputData);
      this.foundThing = "";
      this.searchedEmployee = null;
      this.searchedGuest = null;
      if (inputData != "") {

        this.findEmployee(inputData);
        console.log(this.searchedEmployee);
        if(this.searchedEmployee != null) {
          this.foundThing = "";
          console.log("ehhh");
          this.findPlace(this.searchedEmployee.placeId);
          this.searchedGuest = null;          //have to???
          return;
        }
        else if(this.searchedEmployee === null){ 
          this.foundThing = "";
          this.findGuest(inputData);

          if(this.searchedGuest != null) {
            this.findPlace(this.searchedGuest.placeId);
            this.searchedEmployee = null;
          }
          else{
            this.findPlace(inputData);
            this.searchedEmployee = null;
            this.searchedGuest = null; 
          }
        }
        
      } 
  }

  findEmployee(data : string): void {
    this.employees.forEach(element => {
      if (data === element.employeeName || data === element.employeeSurname || +data === element.employeeId) {
        this.foundThing += element.employeeName + " " + element.employeeSurname + " " 
        + element.employeePosition + " ";
        console.log("To je pracownik");
        this.searchedEmployee = element;
      }
    });
  }

  findGuest(data : string): void {
    this.guests.forEach(element => {
      if (data === element.guestName || data === element.guestSurname) {
        this.foundThing += element.guestName + " " + element.guestSurname + " " 
          + element.startDate + " - " + element.endDate + " ";
        console.log("To je gosc");
        this.searchedGuest = element;
      }
    });
  }
  

  findPlace(data : string): void {
    var personNotFoundJet = false;
    if(this.foundThing === "") {
      var personNotFoundJet = true;
    }
    this.rooms.forEach(element => {
      if (data === element.roomName || +data === element.roomNumber || data === element.roomId) {
        console.log("To je pokój");
        this.foundThing += element.roomNumber + " " + element.roomName + " ";
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId.toString()) === null) {
            this.findGuest(element.guestId.toString());
          }
        }
        return;
      }
    });

    this.stations.forEach(element => {
      if (data === element.stationId) {
        console.log("To je stanowisko");
        this.foundThing +="\nBiurko nr. " + element.stationId.slice(7,8) + " ";
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId.toString()) === null) {
            this.findGuest(element.guestId.toString());
          }
        }
        return;
      }
    });

    this.offices.forEach(element => {
      if (data === element.officeName || +data === element.officeNumber || data === element.officeId) {
        console.log("To je office");
        this.foundThing += element.officeNumber + " " + element.officeName + " ";
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId.toString()) === null) {
            this.findGuest(element.guestId.toString());
          }
        }
        return;
      }
    });

    this.conferenceRooms.forEach(element => {
      if (data === element.conferenceRoomName || +data === element.conferenceRoomNumber || data === element.conferenceRoomId) {
        console.log("To je conferenceRoom");
        this.foundThing += element.conferenceRoomNumber + " " + element.conferenceRoomName + " ";
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId.toString()) === null) {
            this.findGuest(element.guestId.toString());
          }
        }
        return;
      }
    });
  }




/*
this.filteredEmployes = this.employees.filter((employee: IEmployee) =>
            employee.employeeSurname ===inputData);
            this._data.changeMessage(element.placeId);
            this.shySearchCheck = true;
            this._data.changeMsgSearch(this.shySearchCheck);
            */

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
  }

  onClickFire(event : Event) {
    this.wantToFireShine = !this.wantToFireShine;

  }

  onClickCoffee(event : Event) {
    this.wantToCoffeeShine = !this.wantToCoffeeShine;
  }

  onClickAid(event : Event) {
    this.wantToAidShine = !this.wantToAidShine;
  }

  onClickPrinter(event : Event) {
    this.wantToPrinterShine = !this.wantToPrinterShine;
  }

  onClickEat(event : Event) {
    this.wantToEatShine = !this.wantToEatShine;
  }

  onClickInfo(event : Event) {
    this.wantToInfoShine = !this.wantToInfoShine;
  }

  onClickBed(event : Event) {
    this.wantToBedShine = !this.wantToBedShine;
  }

  onClickActive(event : Event) {
    this.wantToActiveShine = !this.wantToActiveShine;
  }

  onClickHealth(event : Event) {
    this.wantToHealthShine = !this.wantToHealthShine;
  }
  
} 

 