import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Select2OptionData } from 'ng2-select2';
import { ServiceMatriculaService } from './service-matricula.service';
import { ServiceMateriaService } from '../materia/service-materia.service';


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
 public ano_Curso;
  public selectAnoCurso;
  abrirMat;
  MatSelect;
  valido;
  activarMat;
  pagos;
  realizarPagos;
  datos;
  verDatos;

  constructor(private serviceMatriculaService: ServiceMatriculaService,
              private serviceMateriaService: ServiceMateriaService) {

                this.selectAnoCurso = [];
                this.matricula = [];
                this.matricula.materias = [];
                this.realizarPagos = [];
                this.getMateria();
                this.getDatos();
                this.select = {};
                this.select.dato = 'cedula';
                this.ano_Curso = this.serviceMateriaService.anoCurso;
              }

            getDatos() {
             this.busqueda =  this.serviceMatriculaService.getDatos();
            }

        selection(data) {
          this.select.dato = data.nombre;
        }

  buscarUsuario(data) {
           this.loading = true;
          this.serviceMatriculaService.buscar(data)
              .subscribe( res => {
                   this.matricula = res.json();
                   this.loading = false;
                   this.verDatos = true;
              },
              err => {
              this.errDatos = JSON.parse(err._body);
              this.loading = false;
              swal(this.errDatos.nombre, this.errDatos.message, 'error');
              console.log(this.errDatos);
                this.verDatos = false;
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


    guardar(data) {
      console.log(data);
      this.loading = true;
      this.serviceMatriculaService.guardar(data)
        .subscribe(res => {
          this.datos = res.json();
          swal(this.datos.nombre, this.datos.message, 'success');
          this.loading = false;
          this.verDatos = false;
        },
        err => {
          this.errDatos = JSON.parse(err._body);
          this.loading = false;
          swal(this.errDatos.nombre, this.errDatos.message, 'error');
          console.log(this.errDatos);
          this.verDatos = false;
        });
    }

    selecAlumno() {

    }

  eliminar(data) {
    const index = this.matricula.materias.indexOf(data);
    this.matricula.materias.splice(index, 1);
  }


  selectAno(data) {
    this.matricula.ano_curso = '';
    this.matricula.materias = [];
    this.activarMat = false;
    for (let i = 0; i < this.ano_Curso.length; i++) {
      if (this.ano_Curso[i].nivel === data) {
        this.selectAnoCurso = this.ano_Curso[i].cuatrimestre;
      }
    }
  }

  selectMateria(data) {
    this.matricula.materias = [];
    this.activarMat = false;
    for (let i = 0; i < this.materia.length; i++) {
      if ( (this.materia[i].nivel === data.nivel) && (this.materia[i].ano_curso === data.ano_curso) ) {
        this.matricula.materias.push({ unidad_credito: this.materia[i].unidad_credito , nombre: this.materia[i].nombre });
        this.activarMat = true;
      }
    }
  }

  agregarMateria() {
    this.abrirMat = true;
    this.matricula.agregarMat = '';
  }

  selectMat(data) {
    this.valido = true;
  for (let i = 0; i < this.materia.length; i++) {
    if (this.materia[i]._id === data) {
      for (let j = 0; j < this.matricula.materias.length; j++) {
        if (this.materia[i].nombre === this.matricula.materias[j].nombre ) {
            this.valido = false;
        }
      }
      if (this.valido) {
        this.matricula.materias.push({ unidad_credito: this.materia[i].unidad_credito, nombre: this.materia[i].nombre });
      }
      }
    }
    this.abrirMat = false;
  }

  ngOnInit() {
  }

}
