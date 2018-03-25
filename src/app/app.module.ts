import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { StationsComponent } from './clickable-stations/stations.component';
import { PopupComponent } from './popup/popup.component';
import { MapComponent } from './map/map.component';
import { UserInterfaceComponent } from './userInterface/userInterface.component';
import { HttpModule } from '@angular/http';
import { ClickableOfficesComponent } from './clickable-offices/clickable-offices.component';
import { ClickableRoomsComponent } from './clickable-rooms/clickable-rooms.component';


@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    PopupComponent,
    MapComponent,
    UserInterfaceComponent,
    ClickableOfficesComponent,
    ClickableRoomsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
