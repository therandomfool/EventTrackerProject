package com.skilldistillery.event.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.event.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

	
	
	
}
