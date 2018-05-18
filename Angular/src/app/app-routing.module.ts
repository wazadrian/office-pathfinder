import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInterfaceComponent } from './userInterface/userInterface.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: UserInterfaceComponent
  },
  {
    path: 'admin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
