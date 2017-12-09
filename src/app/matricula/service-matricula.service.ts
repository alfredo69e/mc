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
    let datos = [];
    return datos = [
      {id: 1, nombre: 'cedula' }, {id: 2, nombre: 'celular' }, {id: 3, nombre: 'correo' }, {id: 4, nombre: 'recibo'}
    ];
  }

  getPagos() {
    let pagos = [];
    return pagos = [
      { id: 1, nombre: 'inscripcion', costo: 30 }, { id: 2, nombre: 'Pago 1', costo: 25 },
      { id: 3, nombre: 'pago 2', costo: 24 }, { id: 4, nombre: 'pago 3', costo: 24 },
      { id: 5, nombre: 'pago 4', costo: 24 }, { id: 6, nombre: 'pago 5', costo: 24 },
      { id: 7, nombre: 'pago 6', costo: 24 }
    ];
  }

  buscar(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/buscar`, body, options);
  }
}
