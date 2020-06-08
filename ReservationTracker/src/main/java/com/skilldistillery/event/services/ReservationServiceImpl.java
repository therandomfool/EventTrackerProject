package com.skilldistillery.event.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.event.entities.Reservation;
import com.skilldistillery.event.repositories.ReservationRepository;

@Service
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
			managedReservation.setName(reservation.getName());
			managedReservation.setReservationTime(reservation.getReservationTime());
			managedReservation.setPhone(reservation.getPhone());
			managedReservation.setHowMany(reservation.getHowMany());
			managedReservation.setRequests(reservation.getRequests());
			managedReservation.setEmail(reservation.getEmail());
			reRepo.saveAndFlush(managedReservation);	
		}
			
		return managedReservation;
	}

	@Override
	public List<Reservation> findAllReservations() {
		
		return reRepo.findAll();
	}

	@Override
	public List<Reservation> reservationForKeyword(String keyword) {
		keyword = "%" + keyword + "%";
		
		return reRepo.findByNameLike(keyword);
	}
	
	


}
