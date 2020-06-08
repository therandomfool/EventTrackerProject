package com.skilldistillery.event.services;

import java.util.List;

import com.skilldistillery.event.entities.Reservation;

public interface ReservationService {
	
	Reservation reservationById(int id);
	Reservation create(Reservation reservation);
	Boolean delete(int id);
	Reservation update(Reservation reservation, int id);
	List<Reservation> findAllReservations();
	List<Reservation> reservationForKeyword(String keyword);

}
