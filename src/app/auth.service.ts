import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private url = '/api/user';

  constructor(private http: Http, private router: Router) {}

  login(data): Observable<Response> {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });

      return this.http.post(`${this.url}/login`, body, options);
  }

  session(): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.url}/session`, options);
  }


  logout() {
      localStorage.removeItem('token');
      this.router.navigateByUrl('Login');
    }

    loginUrl() {
      this.router.navigateByUrl('Dashboard');
    }


}
