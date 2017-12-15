import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ServicePagosService } from '../service-pagos.service';
import { AuthService } from '../../auth.service';
import { Console } from '@angular/core/src/console';

declare let jsPDF;


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  busqueda;
  select;
  loading;
public verDat;
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
  pagar;
  verPago;
  imprimir;

  constructor(private servicePagosService: ServicePagosService, private authService: AuthService) {
    this.prof = [];
    this.select = {};
    this.busqueda = this.servicePagosService.getBusqueda();
    this.select.dato = 'cedula';
    this.session();
    this.usuario = {};
    this.pagar = {};
    this.imprimir = [];
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
         this.loading = false;
         this.verDat = true;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDat = false;
       });
   }

   pagoVer() {
     this.verPago = true;
   }

     guardarPago(prof, pagar) {
       this.data = { prof: prof, pagar: pagar };
      this.valido = false;
       this.loading = true;
     this.servicePagosService.guardarPagoProf(this.data)
       .subscribe(res => {
         this.getdatos = res.json();
         swal(this.getdatos.nombre, this.getdatos.message, 'success');
         this.buscarProf(this.select);
         this.pagar = {};
         this.loading = false;
         this.verDat = true;
         this.verPago = false;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDat = false;
       });

   }

   volver() {
      this.verPago = false;
   }

   selection(data) {
  this.select.dato = data.nombre;
}

  eliminarPagoProf(prof, data) {
     this.data = { prof: prof, data: data };
     this.loading = true;
     this.servicePagosService.eliminarPagoProf(this.data)
       .subscribe(res => {
         this.getdatos = res.json();
         swal(this.getdatos.nombre, this.getdatos.message, 'success');
         this.buscarProf(this.select);
         this.loading = false;
         this.verDat = true;
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDat = false;
       });

   }

   download(prof, data) {
      this.loading = true;
    this.imprimir = { prof, data };

     const doc = new jsPDF();
      doc.setFontSize(25);
         doc.text(50, 10, 'COMPROBANTE DE PAGO');
         doc.setFontSize(18);
         doc.text(65, 20, 'DOCUMENTO NO FISCAL');

         doc.setFontSize(14);
         doc.text(10, 30, 'Recibo: ' + this.imprimir.data._id );

         doc.setFontSize(12);
         doc.text(10, 40, 'Nombre: ' + this.imprimir.prof.nombre + ' ' + this.imprimir.prof.apellido);
         doc.setFontSize(12);
         doc.text(10, 45, 'Cedula: ' + this.imprimir.prof.cedula);
         doc.setFontSize(12);
         doc.text(10, 50, 'Celular: ' + this.imprimir.prof.celular);

         doc.line(10, 60, 200, 60); // horizontal line

         doc.setFontSize(12);
         doc.text(10, 65, 'Monto: ' + this.imprimir.data.costo + '$');
         doc.text(35, 65, 'Comida: ' + this.imprimir.data.comida + '$');
         doc.text(65, 65, 'Total: ' + (this.imprimir.data.comida + this.imprimir.data.costo) + '$');
         doc.text(10, 70, 'comentarios: ' + this.imprimir.data.comentario);
         doc.line(10, 80, 200, 80); // horizontal line

         doc.text(10, 85, 'Este es un Comprobante de pago');


        doc.line(0, 95, 250, 95); // horizontal line


        doc.setFontSize(25);
         doc.text(50, 105, 'Copia COMPROBANTE DE PAGO');
         doc.setFontSize(18);
         doc.text(65, 115, 'DOCUMENTO NO FISCAL');

         doc.setFontSize(14);
         doc.text(10, 125, 'Recibo: ' + this.imprimir.data._id );

         doc.setFontSize(12);
         doc.text(10, 135, 'Nombre: ' + this.imprimir.prof.nombre + ' ' + this.imprimir.prof.apellido);
         doc.setFontSize(12);
         doc.text(10, 145, 'Cedula: ' + this.imprimir.prof.cedula);
         doc.setFontSize(12);
         doc.text(10, 155, 'Celular: ' + this.imprimir.prof.celular);

         doc.line(10, 165, 200, 165); // horizontal line

         doc.setFontSize(12);
         doc.text(10, 170, 'Monto: ' + this.imprimir.data.costo + '$');
         doc.text(35, 170, 'Comida: ' + this.imprimir.data.comida + '$');
         doc.text(65, 170, 'Total: ' + (this.imprimir.data.comida + this.imprimir.data.costo) + '$');
         doc.text(10, 175, 'comentarios: ' + this.imprimir.data.comentario);

         doc.line(10, 185, 200, 185); // horizontal line

         doc.text(10, 195, 'Este es un Comprobante de pago');

         doc.save('comprobante_' + this.imprimir.data._id + '.pdf');

         if (doc.save) {
        this.loading = false;
         }

}
  ngOnInit() {
  }

}
