import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceMatriculaService {

   // config
  private url = '/api/matricula';
  private authorization = '';

  constructor(private http: Http) {

  }

  getDatos() {
    let dato = [];
    return dato = [
      {id: 1, nombre: 'cedula' }, {id: 2, nombre: 'celular' }, {id: 3, nombre: 'correo' }
    ];
  }

  buscar(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/buscar`, body, options);
  }

  guardar(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/guardar`, body, options);
  }

}
