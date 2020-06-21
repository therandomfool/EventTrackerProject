

export class Reservation {

  id: number;
  name: string;
  email: string;
  reservationTime: Date;
  phone: number;
  howMany: number;
  date: Date;
  time: number;
  requests: string;


  constructor( id?: number,
               name?: string,
               email?: string,
               reservationTime?: Date,
               phone?: number,
               howMany?: number,
               date?: Date,
               time?: number,
               requests?: string
               ){

     this.id = id;
     this.name = name;
     this.email = email;
     this.reservationTime = reservationTime;
     this.phone = phone;
     this.howMany = howMany;
     this.date = date;
     this.time = time;
     this.requests = requests;
               }
}
