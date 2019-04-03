// Global Declaration
const btnToggle = document.getElementById('btnMobileToggle');
const body = document.body;
let accordion = document.getElementsByClassName('cassavaApp-accordion');
let services = [];
let products = [];

const fetchJSONFromFile = (file, arrayEle) =>{
	let arrValue = [];

	function status(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return Promise.resolve(response)
	  } else {
	    return Promise.reject(new Error(response.statusText))
	  }
	}

	function json(response) {
	  return response.json()
	}

	fetch(file)
	  .then(status)
	  .then(json)
	  .then(function(data) {
	  	const [values] = Object.values(data);
	  	values.map(value => {
	  		arrValue.push(value);
	  		arrayEle.push(value);
	  	})
	    console.log('Request succeeded with JSON response', data);
	  }).catch(function(error) {
	    console.log('Request failed', error);
	  });

  	return arrValue;
}

//Get Services by sending json URL
fetchServices = () =>{
	services = [];
	fetchJSONFromFile('./data/services.json', services);
	console.log('services',services);
}

// Get current year
const currentYear = () => {
	let d = new Date();
	let year = d.getFullYear();
	document.getElementById('currentYear').innerHTML = year;
}

// Set overlay
const setOverlay = (value) =>{
	let setValue = value;
	// console.log(setValue);
	const overlay = document.querySelector('div.overlay');
	if (setValue == true){
		overlay.style.width = '100%';
		overlay.scrollTop = 0;
		body.classList.add('noScroll');
	} else{
		overlay.style.width = '0%';
		body.classList.remove('noScroll');
	}
};

//Toggle Menu Button
const toogleMenuBtn = () =>{
	// Toggle Button
	const iAwesome = document.querySelector('i.fa.fa-bars');
	let giveOverlay = false;
	btnToggle.addEventListener('click', function() {
		if (btnToggle.style.backgroundColor == '' || btnToggle.style.backgroundColor == 'transparent') {
			btnToggle.style.backgroundColor = "#FD6900";
			iAwesome.style.color = '#fff';
			giveOverlay = true;
		} else{
			btnToggle.style.backgroundColor = "transparent";
			iAwesome.style.color = '#FD6900';
			giveOverlay = false;
		}
		setOverlay(giveOverlay);
	});
}

const accordionHelper = () =>{
	// Accordion

	let aIndex;

	for (aIndex = 0; aIndex < accordion.length; aIndex++) {
	  accordion[aIndex].addEventListener("click", function() {

	    /* Toggle between hiding and showing the active panel then change button background by toggling 'selected' */
	    var panel = this.nextElementSibling;
	    if (panel.style.display === "block") {
	     	panel.style.display = "none";
	    	this.classList.remove('selected');
	    } else {
	    	panel.style.display = "block";
	    	this.classList.add('selected');
	    }
	  });
	}
}

// On application start, perform these
const startApp = () => {
	currentYear(); //Get Current Year
	toogleMenuBtn(); //Enable Toggle Menu
	accordionHelper(); //Enable Accordion Show and Hide functionality
};

startApp();