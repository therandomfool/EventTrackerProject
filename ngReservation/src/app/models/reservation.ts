

export class Reservation {

  id: number;
  name: string;
  email: string;
  reservationTime: Date;
  phone: number;
  howMany: number;


  constructor( id?: number,
               name?: string,
               email?: string,
               reservationTime?: Date,
               phone?: number,
               howMany?: number
               ){

     this.id = id;
     this.name = name;
     this.email = email;
     this.reservationTime = reservationTime;
     this.phone = phone;
     this.howMany = howMany;
               }
}
