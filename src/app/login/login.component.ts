import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credenciales;
  public data;
  public datos;
  public loading;

  constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {
    this.credenciales = { dato: '', clave: '' };
  this.appComponent.session();
  }


  ngOnInit() {
 }

 login(data) {
   this.loading = true;
   this.authService.login(data)
     .subscribe(res => {
       this.datos = res.json();
       console.log(this.datos);
       if (this.datos.valido) {
         this.loading = false;
         localStorage.setItem('token', this.datos.token);
         swal('Bienvenid@.', 'Datos Correctos', 'success');
         this.limpiar();
         this.authService.loginUrl();
       }
     },
     error => {
       this.loading = false;
       swal('Oops......', 'Datos ingresados Incorrectos', 'warning');
       console.log(error);
     }
     );
 }

 limpiar() {
   this.credenciales = { dato: '', clave: '' };
 }

}
