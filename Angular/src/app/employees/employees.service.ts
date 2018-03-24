import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { IEmployee } from './employee';


@Injectable()
export class EmployeesService {

  private _employeeUrl = './api/employees/employees.json';
  constructor(private _http: HttpClient) { }



/*
getEmployees(): IEmployee[]{
  return [
    {
	"employeeId": 1,
        "employeeName": "Maciek",
        "employeeSurname": "Kołodziejski",
        "employeePosition": "Sprzątaczka"
    },
    {
	"employeeId": 2,
        "employeeName": "Oskar",
        "employeeSurname": "Sadowski",
        "employeePosition": "BOSS"
    },
    {
      "employeeId": 3,
            "employeeName": "Mateusz",
            "employeeSurname": "Janiszewski",
            "employeePosition": "INF"
        },
        {
      "employeeId": 4,
            "employeeName": "Dominik",
            "employeeSurname": "Malicki",
            "employeePosition": "INF"
        },
        {
      "employeeId": 5,
            "employeeName": "Mateusz",
            "employeeSurname": "NieJaniszewski",
            "employeePosition": "INF"
        }
  ]
}
*/


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


//getProduct(): Observable<IProduct[]>{



