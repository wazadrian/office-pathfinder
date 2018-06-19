export class GuestModel {
  constructor(
    public id: string,
    public guestName: string,
    public guestSurname: string,
    public startDate: Date,
    public endDate: Date,
    public placeId: string
  ) {}
}
