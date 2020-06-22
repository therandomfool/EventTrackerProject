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
  newReservation = new Reservation();
  showRes = false;
  showCreate = false;
  showEmail = false;
  selectedType = 'all';
  dateTime = null;



  reservation: Reservation[] = [];

  toggleRes(){
    this.showRes = !this.showRes;
    this.showCreate = null;
    this.showEmail = null;
  }

  toggleCreate(){
    this.showCreate = !this.showCreate;
    this.showRes = null;
    this.showEmail = null;
  }

  toggleEmail(){
    this.showEmail = !this.showEmail;
    this.showRes= null;
    this.showCreate = null;
  }

  updateReservation(reservation){
    this.reservationService.update(reservation).subscribe(
      reserve => {console.log('reservation update success');
                  this.reload();
                  this.selected = null;
      },
      fail => {
        console.error('Reservation component error');
      }
    );
  }

  updatePassRes(reservation: Reservation){
    console.log(reservation);

    this.selected = reservation;
    this.editReservation = Object.assign({}, this.selected);
    // this.reload();
  }

  displayAll() {
    this.selected = null;
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

  displayRes(reservation: Reservation) {
    this.selected = reservation;
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

  getTotalPeople(){
    let result = 0;
    for (let i = 0; i < this.reservation.length; i++) {
       result += this.reservation[i].howMany;
    }
    return result;
  }

  loadReservation(){
    this.reservationService.index().subscribe(
      data => this.reservation = data,
      err => console.error('Observer got an error: ' + err)


    );
  }

  getEmailList() {
    let results = [];
    for (let index = 0; index < this.reservation.length; index++) {

      // const reserve = this.reservation[index];
      if ( this.reservation[index].email !== '' || this.reservation[index].email !== null || this.reservation[index].email !== undefined){

        results.push(this.reservation[index].email, this.reservation[index].name);
      }

    }
    return results;
  }


  subCreate(){
    console.log(this.newReservation.time);
    console.log(this.newReservation.date);

     this.dateTime = this.newReservation.date + 'T' + this.newReservation.time;
     this.newReservation.reservationTime = this.dateTime;
     this.create();

  }

  create(){
    console.log(this.newReservation);

    this.reservationService.create(this.newReservation).subscribe(
      data => {
        console.log('creation success');
        this.selected = null;
        this.loadReservation();


      },
      err => {
        console.log('problem with creation');

      }
    );
  }

}
