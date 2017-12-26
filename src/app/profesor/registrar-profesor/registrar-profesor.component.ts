import { Component, OnInit } from '@angular/core';
import { ServiceProfesorService } from '../service-profesor.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-profesor',
  templateUrl: './registrar-profesor.component.html',
  styleUrls: ['./registrar-profesor.component.css']
})
export class RegistrarProfesorComponent implements OnInit {

  public profesor;
  public loading;
  public datos;
  public data;
  public errDatos;
  public validCorreo;
  public validCedula;
  validCelular;

  constructor(private serviceProfesorService: ServiceProfesorService) {
    this.profesor = {};

   }

   guardar(data) {
     this.loading = true;
     this.serviceProfesorService.guardar(data)
       .subscribe(res => {
         this.datos = res.json();
           this.loading = false;
           swal(this.datos.nombre, this.datos.message, 'success');
           this.limpiar();
       },
       error => {
         this.errDatos = JSON.parse(error._body);
         this.loading = false;
         swal(this.errDatos.nombre, this.errDatos.message, 'error');
         console.log(this.errDatos);
         this.loading = false;
       });
   }

  validarCorreo(data) {
    this.loading = true;
    this.serviceProfesorService.validarCorreo(data)
      .subscribe(res => {
        this.datos = res.json();
        this.validCorreo = this.datos;
        this.loading = false;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
         this.loading = false;
      });
  }

  validarCedula(data) {
    this.loading = true;
    this.serviceProfesorService.validarCedula(data)
      .subscribe(res => {
        this.datos = res.json();
        this.validCedula = this.datos;
        this.loading = false;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
         this.loading = false;
      });
  }

  validarCelular(data) {
    this.loading = true;
    this.serviceProfesorService.validarCelular(data)
      .subscribe(res => {
        this.datos = res.json();
        this.validCelular = this.datos;
        this.loading = false;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
         this.loading = false;
      });
  }

   limpiar() {
     this.profesor = {};
   }

  ngOnInit() {
  }

}
