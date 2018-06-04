import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from './Employee.model';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PanelService {
  constructor(private _http: HttpClient, private router: Router) {}
  url = '/api';

  addEmployeeDB(name: string, surname: string, position: string, place: string) {
    const employee: EmployeeModel = new EmployeeModel(11, name, surname, position, place);
    return this._http.post('employees', employee).subscribe (
        error => console.log(error));
  }

}
