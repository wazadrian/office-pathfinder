import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/observable/throw';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/do';
import  'rxjs/add/operator/map';

import { IEmployee } from './employee';


@Injectable()
export class EmployeesService {

  private _employeeUrl: string = 'assets/employees.json';

  constructor(private _http: Http) { }


getEmployees(){
  return this._http.get(this._employeeUrl).map((response:Response) => response.json());
}


/*
  getEmployees(): Observable<IEmployee[]>{
    return this._http.get<IEmployee[]>(this._employeeUrl)
    .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
}
*/
  private handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }

  
}
