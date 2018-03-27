import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { MapComponent } from './map/map.component';
import { UserInterfaceComponent } from './userInterface/userInterface.component';
import { HelpComponent } from './help/help.component';
import { ClickableRoomsComponent } from './clickable-item/clickable-rooms/clickable-rooms.component';
import { StationsComponent } from './clickable-item/clickable-stations/stations.component';
import { ConferenceRoomsComponent } from './clickable-item/conference-rooms/conference-rooms.component';
import { ClickableOfficesComponent } from './clickable-item/clickable-offices/clickable-offices.component';


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
