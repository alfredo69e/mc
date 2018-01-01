import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ServicePagosService } from '../service-pagos.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-varios',
  templateUrl: './varios.component.html',
  styleUrls: ['./varios.component.css']
})
export class VariosComponent implements OnInit {

  pago;
  data;
  loading;
  getdatos;
  errDatos;
  varios;
  usuario;
  constructor(private servicePagosService: ServicePagosService, private authService: AuthService) {
    this.pago = {};
    this.varios = [];
    this.usuario = {};
  }

  guardar(data) {
    this.loading = true;
    this.servicePagosService.pagoVarios(data)
      .subscribe(res => {
        this.getdatos = res.json();
        swal(this.getdatos.nombre, this.getdatos.message, 'success');
        this.loading = false;
        this.limpiar();
        this.getVarios();
      },
      err => {
        this.errDatos = JSON.parse(err._body);
        this.loading = false;
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });

  }

  session() {
    this.authService.session()
      .subscribe(res => {
        this.usuario = res.json();
      },
      err => {
        this.errDatos = err;
      });
  }

  eliminarPagoProf(data) {
    this.loading = true;
    this.servicePagosService.eliminarPagoProf(data)
      .subscribe(res => {
        this.getdatos = res.json();
        swal(this.getdatos.nombre, this.getdatos.message, 'success');
        this.loading = false;
        this.getVarios();
      },
      err => {
        this.errDatos = JSON.parse(err._body);
        this.loading = false;
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });

  }

  getVarios() {
    this.loading = true;
    this.servicePagosService.getVarios()
      .subscribe(res => {
        this.varios = res.json();
        this.loading = false;
        this.limpiar();
      },
      err => {
        this.errDatos = JSON.parse(err._body);
        this.loading = false;
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });

  }

  limpiar() {
    this.pago = {};
  }


  ngOnInit() {
    this.getVarios();
    this.session();
  }

}
