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
			// getAllRes(id);
			getResDisplay(id);
		}
	});

	// Set up reservation creation form 
	document.resFormCreate.create.addEventListener('click', function(event) {
		event.preventDefault();
		createRes();
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

function displayRes(reservation) {
	var resDiv = document.getElementById('resData');
	resDiv.textContent = '';

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
	let form = document.resFormUpdate;
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