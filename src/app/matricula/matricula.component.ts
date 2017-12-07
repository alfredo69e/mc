import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Select2OptionData } from 'ng2-select2';
import { ServiceMatriculaService } from './service-matricula.service';
import { ServiceMateriaService } from '../materia/service-materia.service';
import { ServiceAlumnoService } from '../alumno/service-alumno.service';


@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

 public loading;
 public alumno;
 public errDatos;
 public materia;
 public matricula;
 public exampleData;
 public id;
 public busqueda;
 public select;

  constructor(private serviceMatriculaService: ServiceMatriculaService, private serviceMateriaService: ServiceMateriaService,
              private serviceAlumnoService: ServiceAlumnoService) {

                this.matricula = {};
                this.getMateria();
                this.getDatos();
                this.select = {};
                this.select.datos = 'recibo';
              }

            getDatos() {
             this.busqueda =  this.serviceMatriculaService.getDatos();
            }

        selection(data) {
          this.select.datos = data.nombre;
          console.log(this.select.datos);
        }

        buscar(data) {
           this.loading = true;
          this.serviceMatriculaService.buscar(data)
              .subscribe( res => {
                   this.matricula = res.json();
                   this.loading = false;
              },
              err => {
              this.errDatos = JSON.parse(err._body);
              this.loading = false;
              swal(this.errDatos.nombre, this.errDatos.message, 'error');
              console.log(this.errDatos);
              });
        }

    getMateria() {
      this.loading = true;
      this.serviceMateriaService.getMateria()
        .subscribe( res => {
          this.materia = res.json();
          this.loading = false;

        },
        err => {
          this.errDatos = JSON.parse(err._body);
         this.loading = false;
          swal(this.errDatos.nombre, this.errDatos.message, 'error');
              console.log(this.errDatos);
        });
    }


    guardar() {

    }

    selecAlumno() {

    }


  ngOnInit() {
  }

}
