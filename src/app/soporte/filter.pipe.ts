import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterString): any {
    return filterString
      ? items.filter(item => item.nombre.indexOf(filterString) !== -1)
      : items;
  }

}

@Pipe({
  name: 'filterCorreo'
})
export class filterCorreoPipe implements PipeTransform {

  transform(items: any[], filCorreos): any {
    return filCorreos
      ? items.filter(item => item.correo.indexOf(filCorreos) !== -1)
      : items;
  }

}