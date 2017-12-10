import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ServicePagosService } from './service-pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  busqueda;
  select;
  loading;
  verDatos;
  errDatos;
  pago;
  pagos;

  constructor(private servicePagosService: ServicePagosService ) {

    this.pago = [];
    this.pagos = [];
    this.select = {};
    this.busqueda = this.servicePagosService.getBusqueda();
    this.select.dato = 'recibo';
    this.pagos = this.servicePagosService.getPagos();
    console.log(this.pagos);
   }


  buscarPago(data) {
     this.loading = true;
     this.servicePagosService.buscar(data)
       .subscribe(res => {
         this.pago = res.json();
         console.log(this.pago);
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


  ngOnInit() {
  }

}
