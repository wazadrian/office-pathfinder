import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { EmployeeModel } from '../models/employee.model';

@Injectable()
export class PanelService {
  constructor(private _http: HttpClient, private router: Router) {}
  url = '/api';

  addEmployeeDB(name: string, surname: string, position: string, place: string) {
    const employee: EmployeeModel = new EmployeeModel(null, name, surname, position, place); // nie wiem co z tym ID, 11 jest testowo
    return this._http.post('employees', employee).subscribe (
        error => console.log(error));
  }

  addGuestDB(name: string, surname: string, position: string, place: string, dateFrom: string, dateTo: string) {

  }

  setPlaceDB() {

  }

  deletePlaceeDB() {

  }

}
