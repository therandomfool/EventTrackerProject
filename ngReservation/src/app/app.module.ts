import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './services/reservation.service';
import { DatePipe } from '@angular/common';
import { EmailPipe } from './email.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ReservationComponent,
    EmailPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [
      ReservationService,
      DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
