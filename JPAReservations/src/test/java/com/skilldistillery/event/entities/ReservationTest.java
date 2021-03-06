package com.skilldistillery.event.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReservationTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Reservation event;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf =Persistence.createEntityManagerFactory("ReservationsPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		event = em.find(Reservation.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		event = null;
	}
	

	@Test
	void test() {
		assertNotNull(event);
		assertEquals("Test", event.getName());
		assertEquals("123-456-7890", event.getPhone());
//		assertEquals(2020-06-05, event.getDate());
//		assertEquals(1830, event.getTime());
		assertEquals(3, event.getHowMany());
		assertEquals("none", event.getRequests());
		assertEquals("Test@yahoo.com", event.getEmail());
		assertEquals(true, event.getEnabled());
	}

}
