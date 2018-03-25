import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { IEmployee } from './employee';


@Injectable()
export class EmployeesService {

  private _employeeUrl = './assets/employees.json';
  constructor(private _http: HttpClient) { }



  getEmployees(): Observable<IEmployee[]>{
    return this._http.get<IEmployee[]>(this._employeeUrl)
    .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

  private handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
  }

  
}

//getEmployees(){
//  return this._http.get(this._employeeUrl).map((response:Response) => response.json());
//}

