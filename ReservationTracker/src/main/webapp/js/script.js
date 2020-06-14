window.addEventListener('load', function (){
	init();
});

function init(){
	console.log('script.js loaded');
	// Set up view all reservation form
	document.resForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var id =document.resForm.id.value;
		if(!isNaN(id) && id> 0) {	
			getResDisplay(id);
		}
	});

	// Set up reservation creation form 
	document.resFormCreate.create.addEventListener('click', function(event) {
		event.preventDefault();
		createRes();
	})

	// Set up reservation update form
	document.resFormUpdate.update.addEventListener('click', function(event) {
		event.preventDefault();
		updateRes();
	})

	// Set up reservation display all form
	document.resForm.btnAll.addEventListener('click', function(event) {
		event.preventDefault();
		var id =document.resForm.id.value;
		getAllRes(id);
		
	})

	// Set up How Many reservations form
	document.resForm.btnHowMany.addEventListener('click', function(event) {
		event.preventDefault();
		var id =document.resForm.id.value;
		howManyRes();
		
	})
}

// Reservation not found error
function resError(){
	var resDiv = document.getElementById('resData');
	resDiv.textContent = '';
	let displayError = document.createElement('h1');
	displayError.textContent = 'Reservation not found';
	resDiv.appendChild(displayError);
}

// XHR how many reservations
function howManyRes(){
	let xhr = new XMLHttpRequest();
	uri = 'api/reservation';
	xhr.open('GET', uri, true);
	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
			if ( xhr.status == 200) { // Ok or Created
			let reserveJson = xhr.responseText;
      		var data = JSON.parse(xhr.responseText);
			  console.log(data);
			  displayHowManyRes(data);
    }
    	else if (xhr.status === 404){
      		console.log("GET request failed."); 
    	} else {
			resError();
		}
  }
};
	xhr.send(null);

}

// see how many reservations
function displayHowManyRes(reservation) {
	console.log('hit the how many res');
	var resDiv = document.getElementById('resData');
	resDiv.textContent = '';
	
	var totalRes = 0;
	for(let i = 0; i < reservation.length; i++) {
		totalRes += reservation[i].howMany;
	}
	console.log(totalRes);
	// res how many
	let resHowMany = document.createElement('h3');
	resHowMany.textContent = totalRes;
	resDiv.appendChild(resHowMany);

}

// XHR see all reservations
function getAllRes(){
	console.log('getAllRes')
	let xhr = new XMLHttpRequest();
	uri = 'api/reservation';
	xhr.open('GET', uri, true);
	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
			if ( xhr.status == 200) { // Ok or Created
			let reserveJson = xhr.responseText;
      		var data = JSON.parse(xhr.responseText);
			  console.log(data);
			  displayAllRes(data);
    }
    	else if (xhr.status === 404){
      		console.log("GET request failed."); 
    	} else {
			resError();
		}
  }
};
	xhr.send(null);

}

// see all reservations
function displayAllRes(reservation) {
	console.log('hit the display all res')
	var resDiv = document.getElementById('resData');
	resDiv.textContent = '';
	
	for(let i = 0; i < reservation.length; i++) {
	// create res id
		let resId = document.createElement('h1');
		resId.textContent = 'Reservation Id: ' + reservation[i].id;
		resDiv.appendChild(resId);

	// create res name
		let resName = document.createElement('h1');
		resName.textContent = 'Reservation Name: ' + reservation[i].name;
		resDiv.appendChild(resName);

	// res time
		let resTime = document.createElement('h2');
		resTime.textContent = 'Reservation Time: ' + reservation[i].reservationTime;
		resDiv.appendChild(resTime);

	// res phone
		let resPhone = document.createElement('h3');
		resPhone.textContent = 'Phone Number: ' + reservation[i].phone;
		resDiv.appendChild(resPhone);

	// res how many
		let resHowMany = document.createElement('h3');
		resHowMany.textContent = 'How Many In Party: ' + reservation[i].howMany;
		resDiv.appendChild(resHowMany);

	// res requests
		let resRequest = document.createElement('h3');
		resRequest.textContent = 'Special Requests: ' + reservation[i].requests;
		resDiv.appendChild(resRequest);

	//  res email
		let resEmail = document.createElement('h3');
		resEmail.textContent = 'Reservation Email: ' + reservation[i].email;
		resDiv.appendChild(resEmail);
	}

}

// XHR See reservation by id
function getResDisplay(id){
	let xhr = new XMLHttpRequest();
	console.log(id);
	uri = `api/reservation/${id}`;
	xhr.open('GET', uri, true);
	// xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
			if ( xhr.status == 200) { // Ok or Created
			let reserveJson = xhr.responseText;
      		var data = JSON.parse(xhr.responseText);
			  console.log(data);
			  displayRes(data);
    }
    	else if (xhr.status === 404){
      		console.log("GET request failed."); 
    	} else {
			resError();
		}
  }
};
	xhr.send(null);
}

// See reservation by id
function displayRes(reservation) {
	var resDiv = document.getElementById('resData');
	resDiv.textContent = '';
	
	// create res id
	let resId = document.createElement('h1');
	resId.textContent = reservation.id;
	resDiv.appendChild(resId);

	// create res name
	let resName = document.createElement('h1');
	resName.textContent = reservation.name;
	resDiv.appendChild(resName);

	// res time
	let resTime = document.createElement('h2');
	resTime.textContent = reservation.reservationTime;
	resDiv.appendChild(resTime);

	// res phone
	let resPhone = document.createElement('h3');
	resPhone.textContent = reservation.phone;
	resDiv.appendChild(resPhone);

	// res how many
	let resHowMany = document.createElement('h3');
	resHowMany.textContent = reservation.howMany;
	resDiv.appendChild(resHowMany);

	// res requests
	let resRequest = document.createElement('h3');
	resRequest.textContent = reservation.requests;
	resDiv.appendChild(resRequest);

	//  res email
	let resEmail = document.createElement('h3');
	resEmail.textContent = reservation.email;
	resDiv.appendChild(resEmail);
}

function createRes() {
	let form = document.resFormCreate;
	let reserve = {};
	reserve.name = form.name.value;
	reserve.reservationTime = form.reservationTime.value;
	reserve.phone = form.phone.value;
	reserve.howMany = form.howMany.value;
	reserve.requests = form.requests.value;
	reserve.email = form.email.value;
	reserve.enabled = true;
	postRes(reserve);
}

function postRes(reservation) {
	console.log(reservation);
	let resJson = JSON.stringify(reservation);
	let xhr = new XMLHttpRequest();
	let uri = 'api/reservation';
	xhr.open('POST', uri);
	xhr.setRequestHeader('Content-type', 'application/json')

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 200 || xhr.status === 201) {
				let createRes = JSON.parse(xhr.responseText);
				displayRes(createRes);
			} else {
				if (xhr.status === 400) {
					resError( `Invalid Reservation data unable to create Reservation from <pre> ${resJson}</pre>`);
				} else {
					resError('Unknown error creating Reservation' + xhr.status);
				}
			}
		}
	}
	xhr.send(resJson);
}

function updateRes(){
	console.log('in update res');
	let form = document.resFormUpdate;

	let reserve = {};
	reserve.id = form.id.value;
	reserve.name = form.name.value;
	reserve.reservationTime = form.reservationTime.value;
	reserve.phone = form.phone.value;
	reserve.howMany = form.howMany.value;
	reserve.requests = form.requests.value;
	reserve.email = form.email.value;
	reserve.enabled = true;
	console.log('in UpdateRes' + reserve.howMany);
	postUpdateRes(reserve);
}

function postUpdateRes(reservation) {
	console.log('in postUpdateRes' + reservation.howMany);
	let resJson = JSON.stringify(reservation);
	let xhr = new XMLHttpRequest();
	let uri = 'api/reservation/' + reservation.id;
	xhr.open('PUT', uri);
	xhr.setRequestHeader('Content-type', 'application/json')

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 200 || xhr.status === 201) {
				let updateRes = JSON.parse(xhr.responseText);
				displayRes(updateRes);
			} else {
				if (xhr.status === 400) {
					resError( `Invalid Reservation data unable to create Reservation from <pre> ${resJson}</pre>`);
				} else {
					resError('Unknown error creating Reservation' + xhr.status);
				}
			}
		}
	}
	console.log(resJson);
	xhr.send(resJson);
}