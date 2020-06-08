package com.skilldistillery.event.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.event.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

	List<Reservation> findByNameLike(String keyword);
	
	
}
