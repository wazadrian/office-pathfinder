import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StationsComponent } from './stations/stations.component';
import { PopupComponent } from './popup/popup.component';
import { ConferenceRoomsComponent } from './conference-rooms/conference-rooms.component';
import { MapComponent } from './map/map.component';
import { UserInterfaceComponent } from './userInterface/userInterface.component';

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    PopupComponent,
    ConferenceRoomsComponent,
    MapComponent,
    UserInterfaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
