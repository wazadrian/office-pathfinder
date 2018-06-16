import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { OfficeModel } from './models/office.model';
import { RoomModel } from './models/room.model';
import { StationModel } from './models/station.model';
import { ConferenceRoomModel } from './models/conference-room';
import { EmployeeModel } from './models/employee.model';
import { GuestModel } from './models/guest.model';

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

  getOffice(): Observable<OfficeModel[]> {
    return this._http
      .get<OfficeModel[]>(this._officeUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getRoom(): Observable<RoomModel[]> {
    return this._http
      .get<RoomModel[]>(this._roomUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getStation(): Observable<StationModel[]> {
    return this._http
      .get<StationModel[]>(this._stationUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getConferenceRoom(): Observable<ConferenceRoomModel[]> {
    return this._http
      .get<ConferenceRoomModel[]>(this._conferenceRoomUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getEmployees(): Observable<EmployeeModel[]> {
    return this._http
      .get<EmployeeModel[]>(this._employeeUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  getGuest(): Observable<GuestModel[]> {
    return this._http
      .get<GuestModel[]>(this._guestUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
