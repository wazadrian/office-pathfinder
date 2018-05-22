import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInterfaceComponent } from './userInterface/userInterface.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'admin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
