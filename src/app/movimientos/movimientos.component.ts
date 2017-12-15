import { Component, OnInit } from '@angular/core';
import { ServiceMovimientosService } from './service-movimientos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor(private serviceMovimientosService: ServiceMovimientosService) { }


  ngOnInit() {
  }

}
