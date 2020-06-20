import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/reservation';

  constructor(private http: HttpClient) { }

  // index
index(): Reservation[]{
  return this.http.get<Reservation[]>(this.url + '');
}

// create
create(reservation: Reservation){

}
//  update
update(reservation: Reservation) {

}

//  delete
destroy(id: number) {

}

//  show
show(id: number) {

}


}
