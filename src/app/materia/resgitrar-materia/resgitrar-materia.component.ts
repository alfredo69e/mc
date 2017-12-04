import { Component, OnInit } from '@angular/core';
import { ServiceMateriaService } from '../service-materia.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-resgitrar-materia',
  templateUrl: './resgitrar-materia.component.html',
  styleUrls: ['./resgitrar-materia.component.css']
})
export class ResgitrarMateriaComponent implements OnInit {

  public materia;
  public loading;
  public datos;
  public data;
  public errDatos;
  public anoCurso;
  public cursoAno;

  constructor(private serviceMateriaService: ServiceMateriaService ) {
    this.materia = {};
    this.anoCurso = this.serviceMateriaService.anoCurso;
  }

    guardar(data) {
     this.serviceMateriaService.guardar(data)
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

   selectAno(data) {
     for (let i = 0; i < this.anoCurso.length; i++) {
        if (this.anoCurso[i].nivel === data) {
          this.cursoAno = this.anoCurso[i].cuatrimestre;
        }
     }
   }

   limpiar() {
      this.materia = {};

   }

  ngOnInit() {
  }

}
