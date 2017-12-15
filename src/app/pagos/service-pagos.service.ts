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

  getPagos() {
    let data = [];
    return data = [{ id: 1, nombre: 'Inscripcion', costo: 30 }, { id: 2, nombre: 'Primer pago', costo: 25 },
                   { id: 3, nombre: 'Segundo pago', costo: 24 }, { id: 4, nombre: 'Tercer pago', costo: 24 },
                   { id: 5, nombre: 'Cuarto pago', costo: 24 }, { id: 6, nombre: 'Quinto pago', costo: 24 },
                   { id: 7, nombre: 'Sesto pago', costo: 24 }
    ];
  }

  getPagoProfe() {
    let prof = {};
    return prof = { id: 1, pago: 8, comida: 1.5  };
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
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/Array`, body, options);
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
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/profesor/eliminar/pago`, body, options);
  }


}
