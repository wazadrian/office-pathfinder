import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IOffice } from './clickable-offices/office';
import { IRoom } from './clickable-rooms/room';
import { IStation } from './clickable-stations/station';
import { IConferenceRoom } from './conference-rooms/conferenceRoom';
import { IEmployee } from './employees/employee';
import { IGuest } from './guests/guest';

@Injectable()
export class ApiService {
  private _officeUrl = 'offices';
  private _roomUrl = 'rooms';
  private _stationUrl = 'stations';
  private _conferenceRoomUrl = 'conferenceRooms';
  private _employeeUrl = 'employees';
  // private _employeeUrl = './assets/employees.json';
  private _guestUrl = 'guests';

  constructor(private _http: HttpClient) {}

  getOffice(): Observable<IOffice[]> {
    return this._http
      .get<IOffice[]>(this._officeUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRoom(): Observable<IRoom[]> {
    return this._http
      .get<IRoom[]>(this._roomUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getStation(): Observable<IStation[]> {
    return this._http
      .get<IStation[]>(this._stationUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getConferenceRoom(): Observable<IConferenceRoom[]> {
    return this._http
      .get<IConferenceRoom[]>(this._conferenceRoomUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEmployees(): Observable<IEmployee[]> {
    return this._http
      .get<IEmployee[]>(this._employeeUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getGuest(): Observable<IGuest[]> {
    return this._http
      .get<IGuest[]>(this._guestUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
