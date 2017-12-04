import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConnectionBackend } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceMateriaService {

  // config
  private url = '/api/materia';
  private authorization = '';

  anoCurso = [{ nivel: 'Primer Nivel',
                cuatrimestre: [
                  { nombre: 'Pre-instituto'  },
                  { nombre: 'Cuatrimestre A' },
                  { nombre: 'Cuatrimestre B' },
                  { nombre: 'Cuatrimestre C' }
                              ]
              },
              { nivel: 'Segundo Nivel',
                cuatrimestre: [
                  { nombre: 'Cuatrimestre A' },
                  { nombre: 'Cuatrimestre B' },
                  { nombre: 'Cuatrimestre C' }
                              ]
              },
               { nivel: 'Tercer Nivel',
                cuatrimestre: [
                  { nombre: 'Cuatrimestre A' },
                  { nombre: 'Cuatrimestre B' },
                  { nombre: 'Cuatrimestre C' }
                              ]
              }
             ];


  constructor(private http: Http) { }


   guardar(data): Observable<Response> {
    const body = JSON.stringify(data);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.url}/registrar`, body, options);
  }

  getMateria() {
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

   eliminar(data): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.url}/${data._id}`, options);
  }

}
