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
	document.resFormBtn.btnAll.addEventListener('click', function(event) {
		event.preventDefault();
		getAllRes(id);
		
	})

	// Set up How Many reservations form
	document.resFormBtn.btnHowMany.addEventListener('click', function(event) {
		event.preventDefault();
		howManyRes();
		
	})

	// Set reservation email list
	document.resFormBtn.btnEmails.addEventListener('click', function(event) {
		event.preventDefault();
		emailRes();
		
	})

	
}

// Reservation not found error
function resError(){
	var resDiv = document.getElementById('resData');
	var clearDiv =document.getElementById('resDataId');
	clearDiv.textContent = '';
	resDiv.textContent = '';
	let displayError = document.createElement('h1');
	displayError.textContent = 'Reservation not found';
	resDiv.appendChild(displayError);
}


// XHR Delete reservation 
function deleteRes(id){
	console.log(id);
	// let resJson = JSON.stringify(reservation);
	console.log(id);
	let xhr = new XMLHttpRequest();
	uri = `api/reservation/${id}`;
	xhr.open('DELETE', uri);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if(xhr.status === 200 || xhr.status === 201) {
				let updateRes = JSON.parse(xhr.responseText);
				// displayRes(displayDeleteRes);
				displayDeleteRes();
			} else {
				if (xhr.status === 400) {
					resError( `Invalid Reservation data unable to create Reservation from <pre> ${id}</pre>`);
				} else {
					resError('Unknown error creating Reservation' + xhr.status);
				}
			}
		}
	}
	xhr.send(id);

}

// see delete reservation
function displayDeleteRes() {
	var resDiv = document.getElementById('resData');
	var clearDiv = document.getElementById('resDataId');
	clearDiv.textContent = '';
	resDiv.textContent = '';

	
	
	

}


// XHR email reservation list
function emailRes(){
	let xhr = new XMLHttpRequest();
	uri = 'api/reservation';
	xhr.open('GET', uri, true);
	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
			if ( xhr.status == 200) { // Ok or Created
			let reserveJson = xhr.responseText;
      		var data = JSON.parse(xhr.responseText);
			  displayEmailRes(data);
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
function displayEmailRes(reservation) {
	var resDiv = document.getElementById('resData');
	var clearDiv =document.getElementById('resDataId');
	clearDiv.textContent = '';
	resDiv.textContent = '';
	
	var totalRes = 0;
	for(let i = 0; i < reservation.length; i++) {

		// create res name
		let resName = document.createElement('h1');
		resName.textContent = 'Reservation Name: ' + reservation[i].name;
		resDiv.appendChild(resName);

		//  res email
		let resEmail = document.createElement('h2');
		resEmail.textContent = 'Reservation Email: ' + reservation[i].email;
		resDiv.appendChild(resEmail);
	}
	

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
	var resDiv = document.getElementById('resData');
	var clearDiv =document.getElementById('resDataId');
	clearDiv.textContent = '';
	resDiv.textContent = '';
	
	var totalRes = 0;
	for(let i = 0; i < reservation.length; i++) {
		totalRes += reservation[i].howMany;
	}
	// res how many
	let resHowMany = document.createElement('h1');
	resHowMany.textContent = 'Total People in Reservation:  ' + totalRes;
	resDiv.appendChild(resHowMany);

}

// XHR see all reservations
function getAllRes(){
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
	var resDiv = document.getElementById('resData');
	var clearDiv =document.getElementById('resDataId');
	clearDiv.textContent = '';
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
	var resDiv = document.getElementById('resDataId');
	var clearDiv =document.getElementById('resData');
	clearDiv.textContent = '';
	resDiv.textContent = '';

	if (reservation.enabled === true) {
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

	// create update button
	var button = document.createElement("button");
	button.id = 'btnUpdate';
	button.innerHTML = "Update a Reservation";

	// Append update button
	var body = document.getElementsByTagName("resData")[0];
	resDiv.appendChild(button);

	// Add event handler for update button
	button.addEventListener ("click", function() {
  	
	});

	// create DELETE button
	var button = document.createElement("button");
	button.type ='button';
	button.id = 'btnDelete';
	button.innerHTML = "DELETE a Reservation";

	// Append DELETE button
	var body = document.getElementsByTagName("resData");
	resDiv.appendChild(button);

	// Set reservation delete
	btnDelete.addEventListener('click', function(event) {
		console.log(reservation.id);	
		event.preventDefault();
		deleteRes(reservation.id);
		
	});
	} else {
		resError();
	}
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