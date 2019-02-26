import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSignIn(form: NgForm) {
    const login = form.value.login;
    const password = form.value.password;
    this.authService.signInUser(login, password);
  }
}
