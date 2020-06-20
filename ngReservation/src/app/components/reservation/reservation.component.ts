import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  title= 'Reservation';
  editReservation = null;
  newReservation = null;
  newReservation = new Reservation();
  showComplete = false;

  reservation: Reservation[] = [];







  deleteReservation(id: number) {
    this.reservationService.destroy(id).subscribe(
      reservation => {
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

  displayTable() {
    this.selected = null;
  }

  constructor(
    private reservationService: ReservationService

  ) { }

  ngOnInit(): void {
  }

  reload() {
    console.log('reloading');

    this.reservationService.index().subscribe(
      todos => {
        this.reservation = todos;
        this.selected = null;
        this.editReservation = null;
      },
      fail => {
        console.error('TodoListComponent.index(): error retrieving todos');
        console.error(fail);
      }
    );
  }




}
