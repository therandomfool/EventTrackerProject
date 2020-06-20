import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/reservation';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    ) { }

  // index
index(){
  return this.http.get<Reservation[]>(this.url + '')
  .pipe(
    catchError((err: any) => {
      console.log('reservation service is not reached');
      return throwError('reservation service index is not working');
    })

  );

}

// create
create(reservation){
  return this.http.put<Reservation>(this.url, reservation).pipe (
    catchError((err: any) => {
      console.log('reservation service create is not working');
      return throwError('reservation service create is not working properly');
    })
  );
}


//  update
update(reservation){
  return this.http.put<Reservation>(this.url + '/' + reservation.id, reservation).pipe (
    catchError((err: any) => {
      console.log('reservation service update is not working');
      return throwError('reservation service update is not working properly');

    })
  );

}

//  delete
delete(id){
  return this.http.delete<Reservation>(this.url + '/' + id). pipe(
    catchError((err: any) => {
      console.log('reservation service delete is not working');
      return throwError('reservation service delete is not working properly');
    })
  );

}

//  show
show(id){
  return this.http.get<Reservation>(this.url + '/' + id). pipe(
    catchError((err: any) => {
      console.log('reservation service show is not working');
      return throwError('reservation service show is not working properly');
    })
  );

}
}
