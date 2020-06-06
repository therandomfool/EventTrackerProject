package com.skilldistillery.event.controllers;

import java.beans.PropertyEditorSupport;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.entities.Reservation;
import com.skilldistillery.event.services.ReservationService;

@RestController
@RequestMapping("api")
public class ReservationController {

	@Autowired
	private ReservationService resSvc;
	

	@GetMapping("reservation")
	public List<Reservation> index() {
		return resSvc.findAllReservations();
	}

	@GetMapping("reservation/{id}")
	public Reservation show(@PathVariable Integer id, HttpServletResponse response) {
		Reservation reservation = resSvc.reservationById(id);
		if (reservation == null) {
			response.setStatus(404);
		}
		return reservation;
	}

	@PostMapping("reservation")
	public Reservation create(@RequestBody Reservation reservation, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			reservation = resSvc.create(reservation);
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(reservation.getId());
			response.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			reservation = null;
		}
		return reservation;
	}
	
	
	@DeleteMapping("reservation/{id}")
	public void delete(@PathVariable Integer id, HttpServletResponse response) {
		try {
			if(resSvc.delete(id)) {
			response.setStatus(204);
			}else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(409);
		}
	}
	
	@PutMapping("reservation/{id}")
	public Reservation update(@PathVariable Integer id, @RequestBody Reservation reservation, HttpServletResponse response) {
		try {
			reservation= resSvc.update(reservation, id);
			if (reservation == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			reservation = null;
		}
		return reservation;
	}
	
	@InitBinder
	public void initBinder(WebDataBinder webDataBinder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat timeFormat = new SimpleDateFormat("HH:MM");
		dateFormat.setLenient(true);
		webDataBinder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
		webDataBinder.registerCustomEditor(LocalDate.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				setValue(LocalDate.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd")));
			}
			@Override
			public String getAsText() throws IllegalArgumentException {
				return DateTimeFormatter.ofPattern("yyyy-MM-dd").format((LocalDate) getValue());
			}
		});
		webDataBinder.registerCustomEditor(LocalTime.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				setValue(LocalTime.parse(text, DateTimeFormatter.ofPattern("HH:MM")));
			}
			@Override
			public String getAsText() throws IllegalArgumentException {
				return DateTimeFormatter.ofPattern("HH:MM").format((LocalDate) getValue());
			}
		});
}
	
}




















