import { Component, OnInit } from '@angular/core';
import { ServiceAlumnoService } from '../service-alumno.service';
import swal from 'sweetalert2';
import { FilterAlumnoPipe } from '../filter-alumno.pipe';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  public datos;
  public data;
  public title;
  public alumno;
  public abrir;
  public errDatos;
  public loading;
  public selectProf;

  constructor(private serviceAlumnoService: ServiceAlumnoService) {
    this.title = 'de Profesor';
    this.alumno = {};
    this.getAlumno();
   }

  getAlumno() {
    this.loading = true;
    this.serviceAlumnoService.getAlumno()
      .subscribe(res => {
        this.selectProf = res.json();
        this.loading = false;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        this.loading = false;
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });
  }


  clickEliminar(data) {
    swal({
      title: 'Eliminar',
      text: 'Estas Seguro de Eliminar al Profesor ' + data.nombre + ' ' + data.apellido,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result) {
        this.loading = true;
        this.serviceAlumnoService.eliminar(data).subscribe(
          res => {
            this.datos = res.json();
            this.limpiar();
            this.getAlumno();
            swal(this.datos.nombre, this.datos.message, 'success');
            this.loading = false;
          },
          error => {
            this.errDatos = JSON.parse(error._body);
            this.loading = false;
            swal(this.errDatos.nombre, this.errDatos.message, 'error');
            console.log(this.errDatos);
          });
      }
    });
  }


  clickEdit(data: any) {
    this.alumno = data;
    this.abrir = true;
    this.title = 'Editar Informacion';
  }

  limpiar() {
    this.alumno = {};
    this.abrir = false;
    this.title = 'de Profesor';
  }

  volver() {
    this.abrir = false;
    this.alumno = {};
  }

  editar(data) {
    this.loading = true;
    this.serviceAlumnoService.editar(data)
      .subscribe(res => {
        this.datos = res.json();
        this.limpiar();
        swal(this.datos.nombre, this.datos.message, 'success');
        this.loading = false;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        this.loading = false;
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });

  }

  ngOnInit() {
  }

}
