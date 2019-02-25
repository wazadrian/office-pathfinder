import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthModel } from '../models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient, private router: Router) { }
  url = 'Authorize';

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = this.getToken();
    return !helper.isTokenExpired(token);
  }

  signUpUser(email: string, password: string) {
    const user: AuthModel = new AuthModel(email, password);
    return this._http.post(this.url + '/Register', user);
  }
  signInUser(email: string, password: string) {
    const user: AuthModel = new AuthModel(email, password);
    return this._http.post(this.url, user).subscribe(
      (token: string) => {
        this.router.navigate(['/admin-panel']);
        localStorage.setItem('token', token['token']);
      },
      error => console.log(error)
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
