import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from './models/reservation';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {



  transform(reservations: Reservation[], type: String): Reservation[] {
    const results = [];
    if (type === "all"){
      return reservations;
      }

if(type === 'email'){
    for (let index = 0; index < reservations.length; index++) {

      const reserve = reservations[index];

      if ( reserve.email !== '' || reserve.email !== null || reserve.email !== undefined){
        results.push(reserve);
      }

  }
}
    return results;
  }

}
