package com.skilldistillery.event.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.entities.Reservation;
import com.skilldistillery.event.services.ReservationService;

@RestController
@RequestMapping("api")
public class ReservationController {
	
	@Autowired
	private ReservationService reserve;
	 
	
	@GetMapping("reservation/{id}")
	public List<Reservation> reservationFindById (
//			@PathVariable int id,
			){
				return null;
		
	};
}
