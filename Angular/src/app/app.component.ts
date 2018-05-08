import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ApiService, DataService]
})
export class AppComponent {
  title = 'Welcome to PPG: We protect and beautify the world';
}

