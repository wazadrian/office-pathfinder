export class RoomModel {
  constructor(
    public id: string,
    public roomId: string,
    public roomName: string,
    public roomNumber: string,
    public employeeId: string,
    public guestId: string
  ) {}
}
