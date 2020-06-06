package com.skilldistillery.event.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.event.entities.Reservation;
import com.skilldistillery.event.repositories.ReservationRepository;

public class ReservationServiceImpl  implements ReservationService{
	
	@Autowired
	private ReservationRepository reRepo;

	@Override
	public Reservation reservationById(int id) {
		Optional<Reservation> optReserve = reRepo.findById(id);
		Reservation managedReservation = null;
		if(optReserve.isPresent()) {
			managedReservation = optReserve.get();
		}
		
		return managedReservation;
	}

	@Override
	public Reservation create(Reservation reservation) {
		return reRepo.save(reservation);
	}

	@Override
	public Boolean delete(int id) {
		try {
			reRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Reservation update(Reservation reservation, int id) {
		Optional<Reservation> optReserve = reRepo.findById(id);
		Reservation managedReservation = null;
		if(optReserve.isPresent()) {
			managedReservation = optReserve.get();
			managedReservation.getName();
			managedReservation.getDate();
			managedReservation.getPhone();
			managedReservation.getTime();
			managedReservation.getHowMany();
			managedReservation.getRequests();
			managedReservation.getEmail();
			
		}
			
		return managedReservation;
	}

	@Override
	public List<Reservation> findAllReservations() {
		
		return reRepo.findAll();
	}


}
