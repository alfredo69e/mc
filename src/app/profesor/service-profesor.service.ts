import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceProfesorService {

  // config
  private url = '/api/profesor';
  private authorization = '';

  constructor(private http: Http) { }

  guardar(data): Observable<Response> {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/registrar`, body, options);
  }

  eliminar(data): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.url}/${data._id}`, options);
  }

  validarCorreo(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/validateCorreo`, body, options);
  }

  validarCedula(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/validateCedula`, body, options);
  }

  getProfesor() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.url}`, options);
  }

  editar(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.put(`${this.url}/${data._id}`, body, options);
  }

  validarCelular(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/validateCelular`, body, options);
  }

}
