import { Component, OnInit } from '@angular/core';
import { ServiceProfesorService } from '../service-profesor.service';
import swal from 'sweetalert2';
import { PipeProfesorPipe } from '../pipe-profesor.pipe';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit {

  public datos;
  public data;
  public title;
  public profesor;
  public abrir;
  public errDatos;
  public loading;
  public selectProf;

  constructor(private serviceProfesorService: ServiceProfesorService) {
    this.title = 'de Profesor';
    this.profesor = {};
    this.getProfesor();
  }

  getProfesor() {
    this.loading = true;
    this.serviceProfesorService.getProfesor()
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
        this.serviceProfesorService.eliminar(data).subscribe(
          res => {
            this.datos = res.json();
            this.limpiar();
            this.getProfesor();
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
    this.profesor = data;
    this.abrir = true;
    this.title = 'Editar Informacion';
  }

  limpiar() {
    this.profesor = {};
    this.abrir = false;
    this.title = 'de Profesor';
  }

  volver() {
    this.abrir = false;
    this.profesor = {};
  }

  editar(data) {
    this.loading = true;
    this.serviceProfesorService.editar(data)
    .subscribe( res => {
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
