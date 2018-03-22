import { Component } from '@angular/core';
import { EmployeesService } from './employees/employees.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[EmployeesService, DataService]
})
export class AppComponent {
  title = 'Welcome to PPG: We protect and beautify the world';
}
