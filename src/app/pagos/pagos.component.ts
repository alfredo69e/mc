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
  abrirRealizarPago;
  regPago;

  constructor(private servicePagosService: ServicePagosService, private authService: AuthService  ) {
    this.regPago = {};
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
         this.loading = false;
         this.verDatos = true;
         this.getPagos();
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDatos = false;
       });
   }

   guardarPago(pago, regPago) {
     this.loading = true;
      this.valido = true;
     this.data = { pago, regPago };
     if (this.pagado === this.pago.recibo.costo) {
       this.valido = false;
     }
     if (this.valido) {
       this.servicePagosService.guardar(this.data)
       .subscribe(res => {
         this.getdatos = res.json();
         swal(this.getdatos.nombre, this.getdatos.message, 'success');
         this.buscarPago(this.select);
         this.loading = false;
         this.verDatos = true;
         this.regPago = {};
         this.abrirRealizarPago = false;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDatos = false;
       });
      }else {
       this.loading = false;
        swal('Cobros', 'No tiene mas Cobros por Realizar', 'warning');
     }
   }

   getPagos() {
     this.pagado = 0;
     for (let i = 0; i < this.pago.pago.length; i++) {
            this.pagado = this.pagado + this.pago.pago[i].costo;
       }
   }

   eliminarPago(data) {
     console.log(data);
     this.loading = true;
     this.servicePagosService.eliminarPago(data)
       .subscribe(res => {
         this.getdatos = res.json();
         swal(this.getdatos.nombre, this.getdatos.message, 'success');
         this.buscarPago(this.select);
         this.loading = false;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
       });

   }

  realizarPago() {
    this.abrirRealizarPago = true;
  }

  volver() {
    this.regPago = {};
    this.abrirRealizarPago = false;
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
