export class EmployeeModel {
  constructor(
    public id: string,
    public employeeName: string,
    public employeeSurname: string,
    public employeePosition: string,
    public placeId: string
  ) {}
}
