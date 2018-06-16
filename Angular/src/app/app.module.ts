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
import { ClickableOfficesComponent } from './clickable-offices/clickable-offices.component';
import { ClickableRoomsComponent } from './clickable-rooms/clickable-rooms.component';
import { ClickableOthersComponent } from './clickable-others/clickable-others.component';

import { AuthService } from './auth/auth.service';
import { PanelService } from './admin-panel/panel.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    ConferenceRoomsComponent,
    MapComponent,
    UserInterfaceComponent,
    ClickableOfficesComponent,
    ClickableRoomsComponent,
    ClickableOthersComponent,
    SignUpComponent,
    SignInComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthService,
    PanelService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
