import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
import { Headers } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public datos;
  varLogin = false;
  public errDatos;

  constructor(private authService: AuthService, private router: Router) {
    this.datos = {
      nombre: '',
      apellido: '',
      nivel: ''
    };
    this.session();
  }

logout() {
  this.authService.logout();
  this.varLogin = false;
}

  session() {
    this.authService.session()
            .subscribe(res => {
            this.datos = res.json();
            this.authService.loginUrl();
            this.varLogin = true;
            this.router.navigateByUrl('/Dashboard');
     },
     err => {
       this.errDatos = err;
       if (this.errDatos.status !== 500) {
        swal('Token.', this.errDatos._body, 'warning');
       console.log(this.errDatos);
       this.router.navigateByUrl('/');
        this.varLogin = false;
       }else {
        this.router.navigateByUrl('/');
        this.varLogin = false;
       }

     });
    }


OnInit() {}


}
