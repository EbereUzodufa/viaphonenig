// Global Declaration
const btnToggle = document.getElementById('btnMobileToggle');
const body = document.body;
let accordion = document.getElementsByClassName('cassavaApp-accordion');

// Get current year
const currentYear = () => {
	let d = new Date();
	let year = d.getFullYear();
	document.getElementById('currentYear').innerHTML = year;
}

// Set overlay
const setOverlay = (value) =>{
	let setValue = value;
	console.log(setValue);
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
	currentYear();
	accordionHelper();
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
};

startApp();