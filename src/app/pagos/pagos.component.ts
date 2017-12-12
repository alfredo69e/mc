import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ServicePagosService } from './service-pagos.service';
import { AuthService } from '../auth.service';

declare let jsPDF;


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
  data;
  usuario;

  constructor(private servicePagosService: ServicePagosService, private authService: AuthService  ) {

    this.pago = [];
    this.select = {};
    this.busqueda = this.servicePagosService.getBusqueda();
    this.select.dato = 'recibo';
    this.session();
    this.usuario = {};
    this.pago.recibo = {};
    this.pago.alumno = {};
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

  buscarPago(data) {
     this.loading = true;
     this.servicePagosService.buscar(data)
       .subscribe(res => {
         this.pago = res.json();
         this.pago.pagos = this.servicePagosService.getPagos();
         this.pago.buscar = data;
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
         this.buscarPago(this.pago.buscar);
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
                              costo: this.pago.pagos[j].costo,  pagado: true,
                              fecha: this.pago.recibo.pagos[i].creado
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

   eliminarPago(select, data) {
     this.data = { select, data };
     this.loading = true;
     this.servicePagosService.eliminarPago(this.data)
       .subscribe(res => {
         this.getdatos = res.json();
         swal(this.getdatos.nombre, this.getdatos.message, 'success');
         this.buscarPago(this.pago.buscar);
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


   download() {
      const pdf = new jsPDF('p', 'pt', 'a4');
      const source = $('#imprimir')[0];

      const specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true;
            }
        };
       const margins = {
            top: 5,
            bottom: 60,
            left: 10,
            width: 600
        };

        pdf.fromHTML(
            source,
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('Prueba.pdf');
            }, margins
        );
}

selection(data) {
  this.select.dato = data.nombre;
}

  ngOnInit() {
  }

}
