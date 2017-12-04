import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SoporteService } from '../soporte.service';
import { SelectModule } from 'ng2-select';
import { FilterPipe } from '../filter.pipe';
import swal from 'sweetalert2';




@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  public datos;
  public data;
  public loading;
  public usuario;
  public niveles;
  public abrir;
  public select;
  public usuarioSelect;
  public filterString;
  public filCorreos;
  public abrirClave;
  public show_clave;
  public errDatos;
  public title;

  constructor(private soporteService: SoporteService) {
    this.usuario = { };

    this.select = { };
    this.getUsuario();
    this.usuarioSelect = [];
    this.niveles = this.soporteService.niveles;

    this.title = 'de Usuario ';
  }

  getUsuario() {
    this.loading = true;
    this.soporteService.getUsusario().subscribe(
      res => {
        this.usuarioSelect = res.json();
        this.loading = false;
      },
      error => {
        this.loading = false;
        swal('Oops......', 'Error al Cargar el Usuarios', 'error');
        console.log(error);
      });
  }

  selectUsuario(data: any) {
    this.usuario = JSON.parse(data);
    this.abrir = true;
  }

  limpiar() {
    this.usuario = { };
    this.select = { };
    this.abrirClave = false;
    this.abrir = false;
    this.title = 'de Usuario ';
  }

  clickClave(data: any) {
    this.usuario = data;
    this.usuario.clave = '';
    this.abrirClave = true;
    this.abrir = false;
    this.title = 'Cambio de Clave';
  }

  volver() {
    this.abrirClave = false;
    this.abrir = false;
    this.title = 'de Usuario ';
  }

  cambiarClave(data) {
    this.loading = true;
    this.soporteService.cambiarClave(data)
      .subscribe(res => {
        this.datos = res.json();
        this.limpiar();
        swal( this.datos.nombre, this.datos.message, 'success');
        this.loading = false;
      },
      error => {
        this.errDatos = JSON.parse(error._body);
        this.loading = false;
        swal(this.errDatos.nombre, this.errDatos.message, 'error');
        console.log(this.errDatos);
      });

  }

  editarUsuario(data) {
    this.loading = true;
    this.soporteService.editarUsuario(data)
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

  validarClave() {
    if (this.usuario.clave !== this.usuario.rclave) {
      this.show_clave = true;
    } else {
      this.show_clave = false;
    }
  }

  clickEdit(data: any) {
    this.usuario = data;
    this.abrirClave = false;
    this.abrir = true;
    this.title = 'Editar Informacion';
  }

  eliminarUsuario(data) {
    swal({
      title: 'Eliminar',
      text: 'Estas Seguro de Eliminar al Usuario ' + data.nombre + ' ' + data.apellido ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result) {
        this.loading = true;
        this.soporteService.eliminarUsuario(data).subscribe(
          res => {
            this.datos = res.json();
            this.limpiar();
            this.getUsuario();
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

  ngOnInit() {}
}
