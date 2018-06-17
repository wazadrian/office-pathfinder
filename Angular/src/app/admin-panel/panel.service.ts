import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { EmployeeModel } from '../models/employee.model';
import { StationModel } from '../models/station.model';
import { GuestModel } from '../models/guest.model';

@Injectable()
export class PanelService {

  url = '/api';
  employees: EmployeeModel[] = [];
  stations: StationModel[] = [];
  //guests: GuestModel[] = [];

  constructor(private _http: HttpClient, private _apiService: ApiService) {
    this._apiService.getEmployees().subscribe(emp => (this.employees = emp));
    this._apiService.getStation().subscribe(st => (this.stations = st));
    //this._apiService.getGuest().subscribe(gst => (this.guests = gst));
  }

  addEmployeeDB(name: string, surname: string, position: string, place: string) {
    this.employees = null;
    const employee: EmployeeModel = new EmployeeModel(null, name, surname, position, place); 
    this._http.post('employees', employee).subscribe (
      error => console.log(error));

      //nie wiem jak sciagnac szybciej id guidowskie ktore ustawila sobie baza wiec troche prób
   /* this._apiService.getEmployees().subscribe(emp => this.employees = emp); //wczytanie od poczatku

    this.employees.forEach(emp => {         //znalezienie dodanego przed chwila
      if (emp.placeId == place) {
        this.stations.forEach(stat => {     //dodanie go do stacji
          if (place === stat.stationId) {
            stat.employeeId = emp.id;
            return this._http.put<StationModel>('stations/'+stat.id, stat).subscribe (
              error => console.log(error));
          }      
        });
      }
    });*/
  
  }

  addGuestDB(name: string, surname: string, position: string, place: string, dateFrom: Date, dateTo: Date) {
    console.log(name + " " + surname + " " + place + " " + dateFrom + " " + dateTo);
    const guest: GuestModel = new GuestModel(null, name, surname, dateFrom, dateTo, place);     //ten sam brak co z pracownikiem
    this._http.post('guests', guest).subscribe (
      error => console.log(error));
  }

  setPlaceDB(employee: EmployeeModel, stationID: string) {
    employee.placeId = stationID;
    this._http.put<EmployeeModel>('employees/'+employee.id, employee).subscribe (
      error => console.log(error));
    this.stations.forEach(element => {
      if (stationID == element.stationId) {
        element.employeeId = employee.id;
        return this._http.put<StationModel>('stations/'+element.id, element).subscribe (
          error => console.log(error));
      }      
    });
  }

  deletePlaceeDB(employee: EmployeeModel) {
    this.stations.forEach(element => {
      if (employee.placeId == element.stationId) {
        element.employeeId = null;
        return this._http.put<StationModel>('stations/'+element.id, element).subscribe (
          error => console.log(error));
      }      
    });
    employee.placeId = null;
    this._http.put<EmployeeModel>('employees/'+employee.id, employee).subscribe (
      error => console.log(error));
  }

}
