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
  getdatos;
  valido;
  costo;
  deuda;
  pagado;

  constructor(private servicePagosService: ServicePagosService ) {

    this.pago = [];
    this.select = {};
    this.busqueda = this.servicePagosService.getBusqueda();
    this.select.dato = 'recibo';
   }


  buscarPago(data) {
     this.loading = true;
     this.servicePagosService.buscar(data)
       .subscribe(res => {
         this.pago = res.json();
         this.pago.pagos = this.servicePagosService.getPagos();
         this.getPagos();
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
         this.buscarPago(this.select);
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

   getPagos() {
     this.pagado = 0;
     for (let i = 0; i < this.pago.recibo.pagos.length; i++) {
       for (let j = 0; j < this.pago.pagos.length; j++) {
         if (this.pago.recibo.pagos[i].id === this.pago.pagos[j].id) {
           this.pago.pagos[j] = ({ id: this.pago.pagos[j].id, nombre: this.pago.pagos[j].nombre,
                              costo: this.pago.pagos[j].costo,  pagado: true
                            });
            this.pagado = this.pagado + this.pago.pagos[j].costo;
         }
       }
     }
    this.getCosto();
   }

   getCosto() {
      this.costo = 0;
     for (let i = 0; i < this.pago.pagos.length; i++) {
       this.costo = this.costo + this.pago.pagos[i].costo;
     }
   }


  ngOnInit() {
  }

}
