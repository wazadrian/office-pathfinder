import { Component, OnInit, Input, AfterContentChecked, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from "../data.service";
import { equal } from 'assert';
import { EmployeeModel } from '../models/employee.model';
import { OfficeModel } from '../models/office.model';
import { ConferenceRoomModel } from '../models/conference-room';
import { RoomModel } from '../models/room.model';
import { StateKey } from '@angular/platform-browser';
import { StationModel } from '../models/station.model';
import { GuestModel } from '../models/guest.model';

@Component({
  selector: 'app-userInterface',
  templateUrl: './userInterface.component.html',
  styleUrls: ['./userInterface.component.css'],

})


export class UserInterfaceComponent implements OnInit, AfterContentChecked {

  @ViewChild('searchInput', {read: ElementRef}) searchInput: ElementRef;

  title = 'Who or what you want to find?';
  employees: EmployeeModel[] = [];
  offices: OfficeModel[] = [];
  conferenceRooms: ConferenceRoomModel[] = [];
  rooms: RoomModel[] = [];
  stations: StationModel[] = [];
  guests: GuestModel[] = [];
  searchedEmployee: EmployeeModel = null;
  searchedGuest: GuestModel = null;

  foundThing: string = "";


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
  buttonsIDs: string [] = ["buttonSearchSlide", "buttonWC", "buttonElev", "buttonWater", "buttonFire", "buttonCoffee", "buttonAid",
                        "buttonPrinter", "buttonEat", "buttonInfo", "buttonBed", "buttonActive", "buttonHealth"];
  btnIdSearchSlide : string = "buttonSearchSlide";
  btnIdWC : string = "buttonWC";
  btnIdElevator : string = "buttonElev";
  dataForSearch : string;


  constructor(private _apiService: ApiService, private _data: DataService) { }

  ngOnInit(): void {
    this._data.currentMessage.subscribe(message => this.placeClicked = message);
    this.getAll();
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
  ngAfterContentChecked() {
    this.filterPlace();
    this.sillyChange = !this.sillyChange;

    if (this.placeClicked[0] != 's') {
      this.shySearchCheck = false;
      this._data.changeMsgSearch(this.shySearchCheck);
    }

    /*
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
    this._data.changeMsgElevator(this.wantToElevatorShine);*/
    this.foundThing = "";
    this.findPlace(this.placeClicked);

  }

  ngAfterViewInit() {
  }

  equalsBtn(a : string) : boolean {
    let pom = false;
    this.buttonsIDs.forEach(element => {
      if (element === a) pom = true;
    });
    return pom;
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

        this.shySearchCheck = true;
        this._data.changeMsgSearch(this.shySearchCheck);
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
        if (this.foundThing != "") {

        this.shySearchCheck = true;
        this._data.changeMsgSearch(this.shySearchCheck);
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
        this._data.changeMessage(element.roomId);
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId) === null) {
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
        this._data.changeMessage(element.stationId);
        console.log("zara zobacze " + element.stationId);
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId) === null) {
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
        this._data.changeMessage(element.officeId);
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId) === null) {
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
        this._data.changeMessage(element.conferenceRoomId);
        if(personNotFoundJet === true) {
          if (this.findEmployee(element.employeeId.toString()) === null) {
            this.findGuest(element.guestId.toString());
          }
        }
        return;
      }
    });
  }



  onClickClear(event : Event) {
    this.wantToElevatorShine = false;     //trzeba to ogarnac w jakiejs kolekcji
    this.wantToWCShine = false;
    this.wantToWaterShine = false;
    this.wantToFireShine = false;
    this.wantToCoffeeShine = false;
    this.wantToAidShine = false;
    this.wantToPrinterShine = false;
    this.wantToEatShine = false;
    this.wantToInfoShine = false;
    this.wantToBedShine = false;
    this.wantToActiveShine = false;
    this.wantToHealthShine = false;
    this._data.changeMsgElevator(this.wantToElevatorShine);
    this._data.changeMsgWC(this.wantToWCShine);
    this._data.changeMessage(event.srcElement.id);
    this._data.changeMsgClear(true);
  }

  onClickElevator(event : Event) {
    this.wantToElevatorShine = !this.wantToElevatorShine;
    this._data.changeMsgElevator(this.wantToElevatorShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickWC(event : Event) {
    this.wantToWCShine = !this.wantToWCShine;
    this._data.changeMsgWC(this.wantToWCShine);
    this._data.changeMessage(event.srcElement.id);
  }

  onClickWater(event : Event) {
    this.wantToWaterShine = !this.wantToWaterShine;
    this._data.changeMsgWater(this.wantToWaterShine);
    this._data.changeMessage(event.srcElement.id);
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

}

