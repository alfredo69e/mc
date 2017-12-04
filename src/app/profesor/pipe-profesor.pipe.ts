import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipeProfesorPipe implements PipeTransform {

  transform(items: any[], filterString): any {
    return filterString
      ? items.filter(item => item.nombre.indexOf(filterString) !== -1)
      : items;
  }

}

@Pipe({
  name: 'filterCedulas'
})
export class filetCedulaProfesorPipe implements PipeTransform {

  transform(items: any[], filterCedula): any {
    return filterCedula
      ? items.filter(item => item.cedula.indexOf(filterCedula) !== -1)
      : items;
  }

}

@Pipe({
  name: 'filterCelu'
})
export class filtCelularProfesorPipe implements PipeTransform {

  transform(items: any[], filterCelular: Number): any {
    return filterCelular
      ? items.filter(item => item.celular.indexOf(filterCelular) !== -1)
      : items;
  }

}

@Pipe({
  name: 'filterCorreos'
})
export class filterCorreoProfesorPipe implements PipeTransform {

  transform(items: any[], filterCorreo): any {
    return filterCorreo
      ? items.filter(item => item.correo.indexOf(filterCorreo) !== -1)
      : items;
  }

}


