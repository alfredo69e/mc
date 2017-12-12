import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ServicePagosService } from '../service-pagos.service';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  busqueda;
  select;
  loading;
  verDatos;
  errDatos;
  pago;
  pagos;
  getdatos;
  valido;
  costo;
  deuda;
  pagado;
  data;
  usuario;
  prof;

  constructor(private servicePagosService: ServicePagosService, private authService: AuthService) {
     this.prof = [];
    this.select = {};
    this.busqueda = this.servicePagosService.getBusqueda();
    this.select.dato = 'cedula';
    this.session();
    this.usuario = {};
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

  buscarProf(data) {
     this.loading = true;
     this.servicePagosService.buscarProf(data)
       .subscribe(res => {
         this.prof = res.json();
         console.log(this.prof);
         this.loading = false;
         this.verDatos = true;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDatos = false;
       });
   }

     guardarPago(data) {
      this.valido = false;
     for (let i = 0; i < this.pago.pagos.length; i++) {
      if (this.pago.pagos[i].pagado !== true && this.valido === false) {
        this.pago.cobro = { id: this.pago.pagos[i].id, nombre: this.pago.pagos[i].nombre,
                              costo: this.pago.pagos[i].costo
                              };
        this.valido = true;
      }
     }

     if (this.valido) {
       this.loading = true;
     this.servicePagosService.guardar(data)
       .subscribe(res => {
         this.getdatos = res.json();
         swal(this.getdatos.nombre, this.getdatos.message, 'success');
         this.loading = false;
         this.verDatos = true;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDatos = false;
       });
      }else {
        swal('Cobros', 'No tiene mas Cobros por Realizar', 'warning');
     }
   }

   selection(data) {
  this.select.dato = data.nombre;
}
  ngOnInit() {
  }

}
