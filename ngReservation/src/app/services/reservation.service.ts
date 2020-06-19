import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/reservation';

  constructor() { }

  // TODO:  CRUD
}
