export class Reservation {

  id: number;
  name: string;
  reservationTime: Date;
  phone: number;
  howMany: number;
  enabled: boolean;

  constructor( id: number,
               name?: string,
               reservationTime?: Date,
               phone?: number,
               howMany?: number,
               enabled?: boolean){

     this.id = id;
     this.name = name;
     this.reservationTime = reservationTime;
     this.phone = phone;
     this.howMany = howMany;
     this.enabled = enabled;
               }
}
