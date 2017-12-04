import { Component, OnInit } from '@angular/core';
import { ServiceAlumnoService } from '../service-alumno.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-alumno',
  templateUrl: './registrar-alumno.component.html',
  styleUrls: ['./registrar-alumno.component.css']
})
export class RegistrarAlumnoComponent implements OnInit {


  public alumno;
  public loading;
  public datos;
  public data;
  public errDatos;
  public validCorreo;
  public validCedul;

  constructor(private serviceAlumnoService: ServiceAlumnoService) {
    this.alumno = {};
   }

  guardar(data) {
    this.serviceAlumnoService.guardar(data)
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
      });
  }

  validarCorreo(data) {
    this.serviceAlumnoService.validarCorreo(data)
      .subscribe(res => {
        this.datos = res.json();
        this.validCorreo = this.datos;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });
  }

  validarCedula(data) {
    this.serviceAlumnoService.validarCedula(data)
      .subscribe(res => {
        this.datos = res.json();
        this.validCedul = this.datos;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });
  }

  limpiar() {
    this.alumno = {};
  }

  ngOnInit() {
  }

}
