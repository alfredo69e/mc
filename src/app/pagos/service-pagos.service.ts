import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicePagosService {

  // config
  private url = '/api/pago';
  private authorization = '';

  constructor(private http: Http) { }

  getBusqueda() {
    let dato = [];
    return dato = [{ id: 1, nombre: 'recibo' }, { id: 2, nombre: 'cedula' },
                   { id: 3, nombre: 'correo' }, { id: 2, nombre: 'celular' }
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
    return this.http.post(`${this.url}`, body, options);
  }

  guardarPagoProf(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/profesor/guardar`, body, options);
  }

  eliminarPago(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.url}/${data._id}`, options);
  }

  pagoProf(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}`, body, options);
  }

  buscarProf(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/profesor/buscar`, body, options);
  }

  eliminarPagoProf(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.url}/profesor/${data._id}`, options);
  }

  pagoVarios(data) {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/varios`, body, options);
  }

  getVarios() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.url}/varios`, options);
  }



}
