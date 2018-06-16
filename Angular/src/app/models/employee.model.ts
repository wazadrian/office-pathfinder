export class EmployeeModel {
  constructor(
    public employeeId: string,
    public employeeName: string,
    public employeeSurname: string,
    public employeePosition: string,
    public placeId: string
  ) {}
}
