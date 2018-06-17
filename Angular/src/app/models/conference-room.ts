export class ConferenceRoomModel {
  constructor(
    public id: string,
    public conferenceRoomId: string,
    public conferenceRoomName: string,
    public conferenceRoomNumber: string,
    public employeeId: string,
    public guestId: string
  ) {}
}
