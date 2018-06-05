export class EmployeeModel {
  constructor(
    public employeeId: number,
    public employeeName: string,
    public employeeSurname: string,
    public employeePosition: string,
    public placeId: string
  ) {}
}
