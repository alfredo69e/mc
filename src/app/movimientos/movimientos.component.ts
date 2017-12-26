import { Component, OnInit } from '@angular/core';
import { ServiceMovimientosService } from './service-movimientos.service';
import swal from 'sweetalert2';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
// import { IMyDpOptions } from 'mydatepicker';



@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  loading;
  data;
  datos;
  date;
  verDat;
  errDatos;
  options: DatepickerOptions = {
    minYear: 2017,
    maxYear: 2030,
    displayFormat: 'DD/MM/YYYY',
    firstCalendarDay: 0,
    locale: esLocale
  };

  constructor(private serviceMovimientosService: ServiceMovimientosService) {
    this.date = {};
    this.date.inicio = this.sumarDias(new Date(), -7);
    this.date.fin = new Date();
   }

  sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  buscar(data) {
    this.loading = true;
    this.serviceMovimientosService.buscar(data)
       .subscribe(res => {
         this.datos = res.json();
         this.verDat = true;
         console.log(this.datos);
       },
       err => {
         this.errDatos = JSON.parse(err._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.verDat = false;
       });
  }


  ngOnInit() {
  }

}
