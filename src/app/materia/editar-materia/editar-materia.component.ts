import { Component, OnInit } from '@angular/core';
import { ServiceMateriaService } from '../service-materia.service';
import swal from 'sweetalert2';
import { FilterMateriaPipe } from '../filter-materia.pipe';


@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {

  public datos;
  public data;
  public title;
  public materia;
  public abrir;
  public errDatos;
  public loading;
  public select;
  public filter;
   public cursoAno;
  public anoCurso;

  constructor(private serviceMateriaService: ServiceMateriaService ) {
    this.materia = {};
    this.title = 'de Profesor';
    this.getMateria();
    this.filter = {};
    this.anoCurso = this.serviceMateriaService.anoCurso;
   }

   selectAno(data) {
     for (let i = 0; i < this.anoCurso.length; i++) {
        if (this.anoCurso[i].nivel === data) {
          this.cursoAno = this.anoCurso[i].cuatrimestre;
        }
     }
   }

    getMateria() {
    this.loading = true;
    this.serviceMateriaService.getMateria()
    .subscribe(res => {
        this.select = res.json();
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
      text: 'Estas Seguro de Eliminar la Materia: ' + data.nombre + ' ' + data.apellido,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result) {
        this.loading = true;
        this.serviceMateriaService.eliminar(data).subscribe(
          res => {
            this.datos = res.json();
            this.limpiar();
            this.getMateria();
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

  editar(data) {
    this.loading = true;
    this.serviceMateriaService.editar(data)
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


    clickEdit(data: any) {
    this.materia = data;
    this.selectAno(this.materia.nivel);
    this.abrir = true;
    this.title = 'Editar Informacion';
  }

  limpiar() {
    this.materia = {};
    this.abrir = false;
    this.title = 'de Materia';
  }

  volver() {
    this.abrir = false;
    this.materia = {};
  }


  ngOnInit() {
  }

}
