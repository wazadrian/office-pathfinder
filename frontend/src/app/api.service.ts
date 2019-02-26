import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { OfficeModel } from './models/office.model';
import { RoomModel } from './models/room.model';
import { StationModel } from './models/station.model';
import { ConferenceRoomModel } from './models/conference-room';
import { EmployeeModel } from './models/employee.model';
import { GuestModel } from './models/guest.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private _officeUrl = 'offices';
  private _roomUrl = 'rooms';
  private _stationUrl = 'stations';
  private _conferenceRoomUrl = 'conferenceRooms';
  private _employeeUrl = 'employees';
  // private _employeeUrl = './assets/employees.json';
  private _guestUrl = 'guests';

  constructor(private _http: HttpClient) { }

  getOffice(): Observable<OfficeModel[]> {
    return this._http
      .get<OfficeModel[]>(this._officeUrl);
  }

  getRoom(): Observable<RoomModel[]> {
    return this._http
      .get<RoomModel[]>(this._roomUrl);
  }
  getStation(): Observable<StationModel[]> {
    return this._http
      .get<StationModel[]>(this._stationUrl);
  }
  getConferenceRoom(): Observable<ConferenceRoomModel[]> {
    return this._http
      .get<ConferenceRoomModel[]>(this._conferenceRoomUrl);
  }

  getEmployees(): Observable<EmployeeModel[]> {
    return this._http
      .get<EmployeeModel[]>(this._employeeUrl);
  }
  getGuest(): Observable<GuestModel[]> {
    return this._http
      .get<GuestModel[]>(this._guestUrl);
  }
}
