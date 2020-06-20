import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  title = 'Reservation';
  selected = null;
  editReservation = null;
  newReservation = null;
  showComplete = false;
  selectedType: String = 'all';

  types = [
    'all',
    'email list'
  ]

  reservation: Reservation[] = [];

  updateReservation(reservation){
    this.reservationService.update(this.updateReservation).subscribe(
      reserve => {console.log('reservation update success');
                  this.reload();
      },
      fail => {
        console.error('Reservation component error');
      }
    )
  }


  deleteReservation(id: number) {
    this.reservationService.delete(id).subscribe(
      reservation => {
        console.log('reservation delete was successful');
        this.reload();
      },
      fail => {
        console.error('TodoListComponent.index(): error retrieving todos');
        console.error(fail);
      }
    );
  }

  displayReservation(reservation: Reservation) {
    this.selected = reservation;
  }

  displayAll() {
    this.selected = null;
  }

  constructor(
    private reservationService: ReservationService

  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    console.log('reloading');

    this.reservationService.index().subscribe(
      data => {
        this.reservation = data;
        this.selected = null;
        this.editReservation = null;
      },
      fail => {
        console.error('TodoListComponent.index(): error retrieving todos');
        console.error(fail);
      }
    );
  }

  onSubmit(reservation){
    this.selected = reservation;
  }

  showTable(){
    this.selected = null;
  }

  getReservationCount() {
    return this.reservation.length;
  }

  getEmailList() {
    const results = [];
    for (let index = 0; index < Reservation.length; index++) {

      const reserve = Reservation[index];
      if ( reserve.email !== '' || reserve.email !== null || reserve.email !== undefined){
        results.push(reserve);
      }

    }
    return results;
  }

}
