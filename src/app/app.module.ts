import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PopupComponent } from './popup.component';
import { ConferenceRoomsComponent } from './conference-rooms/conference-rooms.component';
import { StationsComponent } from './stations/stations.component';


@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    ConferenceRoomsComponent,
    StationsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
