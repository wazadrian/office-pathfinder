import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { StationsComponent } from './clickable-stations/stations.component';
import { PopupComponent } from './popup/popup.component';
import { ConferenceRoomsComponent } from './conference-rooms/conference-rooms.component';
import { MapComponent } from './map/map.component';
import { UserInterfaceComponent } from './userInterface/userInterface.component';
import { HelpComponent } from './help/help.component';
import { ClickableOfficesComponent } from './clickable-offices/clickable-offices.component';
import { ClickableRoomsComponent } from './clickable-rooms/clickable-rooms.component';


@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    PopupComponent,
    ConferenceRoomsComponent,
    MapComponent,
    UserInterfaceComponent,
    HelpComponent,
    ClickableOfficesComponent,
    ClickableRoomsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
