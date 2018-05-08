import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { StationsComponent } from './clickable-stations/stations.component';
import { ConferenceRoomsComponent } from './conference-rooms/conference-rooms.component';
import { MapComponent } from './map/map.component';
import { UserInterfaceComponent } from './userInterface/userInterface.component';
import { HelpComponent } from './help/help.component';
import { ClickableOfficesComponent } from './clickable-offices/clickable-offices.component';
import { ClickableRoomsComponent } from './clickable-rooms/clickable-rooms.component';
import { ClickableOthersComponent } from './clickable-others/clickable-others.component';


@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    ConferenceRoomsComponent,
    MapComponent,
    UserInterfaceComponent,
    HelpComponent,
    ClickableOfficesComponent,
    ClickableRoomsComponent,
    ClickableOthersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
