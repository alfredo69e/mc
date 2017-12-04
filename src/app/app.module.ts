import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { Select2Module } from 'ng2-select2';
import { NgxPaginationModule } from 'ngx-pagination';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SoporteComponent } from './soporte/soporte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarComponent } from './soporte/registrar/registrar.component';
import { EditarComponent } from './soporte/editar/editar.component';
import { EliminarComponent } from './soporte/eliminar/eliminar.component';
import { RegistrarProfesorComponent } from './profesor/registrar-profesor/registrar-profesor.component';
import { EditarProfesorComponent } from './profesor/editar-profesor/editar-profesor.component';
import { RegistrarAlumnoComponent } from './alumno/registrar-alumno/registrar-alumno.component';
import { EditarAlumnoComponent } from './alumno/editar-alumno/editar-alumno.component';
import { ResgitrarMateriaComponent } from './materia/resgitrar-materia/resgitrar-materia.component';
import { EditarMateriaComponent } from './materia/editar-materia/editar-materia.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

// services
import { AuthService } from './auth.service';
import { SoporteService } from './soporte/soporte.service';
import { ServiceProfesorService } from './profesor/service-profesor.service';
import { ServiceAlumnoService } from './alumno/service-alumno.service';
import { ServiceMateriaService } from './materia/service-materia.service';



// Pipe
import { FilterPipe, filterCorreoPipe } from './soporte/filter.pipe';
import { PipeProfesorPipe, filetCedulaProfesorPipe, filterCorreoProfesorPipe,
  filtCelularProfesorPipe } from './profesor/pipe-profesor.pipe';
import { FilterAlumnoPipe } from './alumno/filter-alumno.pipe';
import { FilterMateriaPipe } from './materia/filter-materia.pipe';


const appRoutes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Usuario/Registrar', component: RegistrarComponent },
  { path: 'Usuario/Eliminar', component: EliminarComponent },
  { path: 'Profesor/Registrar', component: RegistrarProfesorComponent },
  { path: 'Profesor/Editar', component: EditarProfesorComponent },
  { path: 'Alumno/Registrar', component: RegistrarAlumnoComponent },
  { path: 'Alumno/Editar', component: EditarAlumnoComponent },
  { path: 'Materia/Registrar', component: ResgitrarMateriaComponent },
  { path: 'Materia/Editar', component: EditarMateriaComponent },
  { path: '', redirectTo: '/Login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SoporteComponent,
    DashboardComponent,
    RegistrarComponent,
    EditarComponent,
    EliminarComponent,
    FilterPipe,
    filterCorreoPipe,
    RegistrarProfesorComponent,
    EditarProfesorComponent,
    PipeProfesorPipe,
    filetCedulaProfesorPipe,
    filterCorreoProfesorPipe,
    filtCelularProfesorPipe,
    RegistrarAlumnoComponent,
    EditarAlumnoComponent,
    FilterAlumnoPipe,
    ResgitrarMateriaComponent,
    EditarMateriaComponent,
    FilterMateriaPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    CustomFormsModule,
    HttpModule,
    LoadingModule,
    Select2Module,
    NgxPaginationModule,
    FilterPipeModule
    // other imports here
  ],
  providers: [
    SoporteService,
    AuthService,
    ServiceProfesorService,
    ServiceAlumnoService,
    ServiceMateriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
