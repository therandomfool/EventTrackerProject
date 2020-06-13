window.addEventListener('load', function (){
	init();
});

function init(){
	console.log('script.js loaded');
	// Set up view all reservation form
	document.resForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var resId =document.resForm.resId.value;
		if(!isNaN(resId) && resId> 0) {
			getAllRes(id);
		}
	});
	// Set up reservation creation form 
	document.resFormCreate.addRes.addEventListener('click', function(event) {
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
	resError.appendChild(displayError);
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
	resTime.textContent = reservation.time;
	resDiv.appendChild(resTime);

	// res phone
	let resPhone = document.createElement('h3');
	resPhone.textContent = reservation.phone;
	resPhone.appendChild(resTime);

	// res how many
	let resHowMany = document.createElement('h3');
	resHowMany.textContent = reservation.howMany;
	resHowMany.appendChild(resHowMany);

	// res requests
	let resRequest = document.createElement('h3');
	resRequest.textContent = reservation.request;
	resRequest.appendChild(resRequest);

	//  res email
	let resEmail = document.createElement('h3');
	resEmail.textContent = reservation.email;
	resEmail.appendChild(resEmail);
}

function createRes() {
	let form = document.resFormCreate;
	let reserve = {};
	reserve.name = form.name.value;
	reserve.time = form.time.value;
	reserve.phone = form.phone.value;
	reserve.howMany = form.howMany.value;
	reserve.request = form.request.value;
	reserve.email = form.email.value;
}

function postRes(reservation) {
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