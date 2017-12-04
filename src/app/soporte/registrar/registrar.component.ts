import { Component, OnInit } from '@angular/core';
import { SoporteService } from '../soporte.service';
import swal from 'sweetalert2';
import { AppComponent } from '../../app.component';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  niveles = [];
  public usuario;
  public show_clave;
  public data;
  public datos;
  public errorMessage;
  public loading;
  public errDatos;
  public validCorreo;
  public validCedula;

  constructor(private soporteService: SoporteService, private appComponent: AppComponent) {
    this.usuario = {
      nombre: '',
      apellido: '',
      correo: '',
      cedula: '',
      clave: '',
      rclave: '',
      nivel: ''
    };
  }

  validarClave() {
    if (this.usuario.clave !== this.usuario.rclave) {
      this.show_clave = true;
    }else {
      this.show_clave = false;
    }
  }

  guardarUsuairo(data) {
    this.loading = true;
    this.soporteService.guardarSoporte(data)
      .subscribe(res => {
          this.datos = res.json();
          console.log(this.datos);
          if (this.datos) {
            this.loading = false;
            swal('Felicitaciones.', 'Usuario a sido Registrado', 'success');
            this.limpiar();
          }else {
            this.loading = false;
            swal('Oops......', 'Error al Registrar el Usuario', 'error');
          }
          },
          error => {
            this.errDatos = JSON.parse(error._body);
            this.loading = false;
            swal(this.errDatos.nombre, this.errDatos.message, 'error');
            console.log(this.errDatos);
          });
    }

limpiar() {
  this.usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    cedula: '',
    clave: '',
    rclave: '',
    nivel: ''
  };
}

validarCorreo(data) {
  this.soporteService.validarCorreo(data)
    .subscribe(res => {
      this.datos = res.json();
        this.validCorreo = this.datos;
        console.log(this.validCorreo);
      },
    error => {
      this.errDatos = JSON.parse(error._body);
      swal(this.errDatos.nombre, this.errDatos.message, 'error');
      console.log(this.errDatos);
    });
}

  validarCedula(data) {
    this.soporteService.validarCedula(data)
      .subscribe(res => {
        this.datos = res.json();
          this.validCedula = this.datos;
        console.log(this.validCedula);
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });
  }

  ngOnInit() {
    this.niveles = this.soporteService.niveles;
  }
}
