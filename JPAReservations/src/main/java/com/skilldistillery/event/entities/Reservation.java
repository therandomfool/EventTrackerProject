package com.skilldistillery.event.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Reservation {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private LocalDate date;
	
	private String phone;
	
	private LocalDate time;
	
	private int howMany;
	
	private String requests;
	
	private String email;
	
	private Boolean enabled;
	
	
//	Methods
	
	
	public Reservation(int id, String name, LocalDate date, String phone, LocalDate time, int howMany, String requests,
			String email, Boolean enabled) {
		super();
		this.id = id;
		this.name = name;
		this.date = date;
		this.phone = phone;
		this.time = time;
		this.howMany = howMany;
		this.requests = requests;
		this.email = email;
		this.enabled = enabled;
	}
	
	public Reservation() {
		super();
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getTime() {
		return time;
	}

	public void setTime(LocalDate time) {
		this.time = time;
	}

	public int getHowMany() {
		return howMany;
	}

	public void setHowMany(int howMany) {
		this.howMany = howMany;
	}

	public String getRequests() {
		return requests;
	}

	public void setRequests(String requests) {
		this.requests = requests;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public String toString() {
		return "Reservation [id=" + id + ", name=" + name + ", date=" + date + ", phone=" + phone + ", time=" + time
				+ ", howMany=" + howMany + ", requests=" + requests + ", email=" + email + ", enabled=" + enabled + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Reservation other = (Reservation) obj;
		if (id != other.id)
			return false;
		return true;
	}



	
	

}
