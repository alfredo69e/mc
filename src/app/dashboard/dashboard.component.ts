import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceDashboardService } from './service-dashboard.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  datos;
  loading;
  errDatos;

  constructor(private appComponent: AppComponent, private serviceDashboardService: ServiceDashboardService) {
    this.appComponent.session();
    this.datos = [];
  }

  getCargar() {
    this.serviceDashboardService.getCargar()
      .subscribe(res => {
        this.datos = res.json();
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
    this.getCargar();
  }

}
