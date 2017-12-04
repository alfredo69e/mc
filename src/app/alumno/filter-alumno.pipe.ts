import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlumno'
})
export class FilterAlumnoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
