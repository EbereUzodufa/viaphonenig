// Global Declaration
const btnToggle = document.getElementById('btnMobileToggle');
const body = document.body;


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

// On application start, perform these
const startApp = () => {
	currentYear();
	const iAwesome = document.querySelector('i.fa.fa-bars');
	let giveOverlay = false;
	btnToggle.addEventListener('click', function() {
		if (btnToggle.style.backgroundColor == '' || btnToggle.style.backgroundColor == 'transparent') {
			btnToggle.style.backgroundColor = "#FD6900";
			iAwesome.style.color = '#fff';
			giveOverlay = true;
		} else{
			btnToggle.style.backgroundColor = "transparent";
			iAwesome.style.color = '##FD6900';
			giveOverlay = false;
		}
		setOverlay(giveOverlay);
	});
};

startApp();