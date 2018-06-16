export class GuestModel {
  constructor(
    public guestId: string,
    public guestName: string,
    public guestSurname: string,
    public startDate: Date,
    public endDate: Date,
    public placeId: string
  ) {}
}
