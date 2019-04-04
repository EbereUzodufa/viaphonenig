// Global Declaration
const btnToggle = document.getElementById('btnMobileToggle');
const body = document.body;
let accordion = document.getElementsByClassName('cassavaApp-accordion');
let services = [];
let products = [];
const footerUl = document.getElementById('footer-products');


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

  	// return arrValue;
}

//Get Services by sending json URL
fetchServices = () =>{
	services = [];
	fetchJSONFromFile('./data/services.json', services);
	// console.log('services',services);
}

//Get individual service(s)
fetchGetServicesHTML = () =>{
	// console.log('service', services);
	const article = document.querySelector('article.viaphone-services');
	if(!article){
		console.log('no service article');
	} else{
		services.forEach(service=>{
			// console.log('A serv', service);
			// console.log('Returned Div',createServiceHTML(service));
			article.append(createServiceHTML(service));
		})
	}
}

createServiceHTML = (service) =>{
	//Create Elements

	const {id, name, image, writeUp} = service;
	// console.log('service items', `This is the id = ${id}, name = ${name}, image = ${image}, write-up = ${writeUp}`);

	const div = document.createElement('div');
	div.classList.add('service');

	const img = document.createElement('img');
	img.classList.add('service-image');
	img.src = `images/services/${image}`;
	img.alt = `Image of our service, ${name}`;
	div.append(img);


	const pTitle = document.createElement('p');
	pTitle.classList.add('service-title');
	pTitle.innerHTML = name;
	div.append(pTitle);

	const pText = document.createElement('p');
	pText.classList.add('service-text');
	pText.innerHTML = writeUp;
	div.append(pText);

	return div;
}

//Create Our Services and log them in
GetServices = () =>{
	fetchServices();
	window.addEventListener('load', function() {
		fetchGetServicesHTML();
	});
}

//Get Products by sending json URL
fetchProducts = () =>{
	products = [];
	fetchJSONFromFile('./data/products.json', products);
	console.log('product', products);
}

//Get individual product(s)
fetchGetProductsHTML = () =>{
	// console.log('product', products);
	const article = document.querySelector('article.viaphone-products');
	if(!article){
		console.log('no product article');
	} else{
		products.forEach(product=>{
		// console.log('A prod', product);
		// console.log(`Product ${id}`, `This is the id = ${id}, name = ${name}, image = ${image}, features = ${features}, write-up = ${writeUp}, writeUp-list = ${writeUpList}, featured = ${featured}`);
		// createProductCardHTML(product);
		// console.log('Returned Div',createProductCardHTML(product));
			article.append(createProductCardHTML(product));
		})
	}
}

createProductCardHTML = (product) =>{
	//Create Elements

	const {id, name, features, image, writeUp, writeUpList, featured} = product;
	// console.log('product items', `This is the id = ${id}, name = ${name}, image = ${image}, write-up = ${writeUp}`);

	const div = document.createElement('div');
	div.classList.add('product');

	const img = document.createElement('img');
	img.classList.add('product-image');
	img.src = `images/products/${image}`;
	img.alt = `Image of our product, ${name}`;
	div.append(img);


	const pTitle = document.createElement('p');
	pTitle.classList.add('product-title');
	pTitle.innerHTML = name;
	div.append(pTitle);

	const pText = document.createElement('p');
	pText.classList.add('product-text');
	const excerptText = writeUp[0];
	pText.innerHTML = GetExcerpt(excerptText);
	div.append(pText);

	const a = document.createElement('a');
	a.classList.add('product-link');
	a.innerHTML = `Click here to know more about ${name}`;
	a.href = "";
	a.role = 'button';
	div.append(a);

	return div;
}

GetExcerpt = (writeUp) =>{
	const syntax = "."
	const syntaxPos = writeUp.indexOf(syntax);
	const excerpt = writeUp.slice(0, (syntaxPos + 1));
	// console.log(excerpt);
	return excerpt;
}

//Create Our Products and load them in
GetProducts = () =>{
	fetchProducts();
	window.addEventListener('load', function() {
		fetchGetProductsHTML();
	});
}

//Created for footer-products
createFooterProducts = () =>{
	products.forEach(product=>{
		footerUl.append(createFooterProductHTML(product));
	});

	footerUl.append(createFooterProductCassavaAppHTML());
}

//Created for footer-products HTML
createFooterProductHTML = (product) =>{
	const li = document.createElement('li');
	li.classList.add('footer-product');

	const a = document.createElement('a');
	a.classList.add('footer-product-link');
	a.href = "";
	a.innerHTML = product.name;

	li.append(a);
	return li;
}

//Create CassavaApp footer product HTML
createFooterProductCassavaAppHTML = () =>{
	const li = document.createElement('li');
	li.classList.add('footer-product');

	const a = document.createElement('a');
	a.classList.add('footer-product-link');
	a.href = "cassavaapp.html";
	a.innerHTML = 'CassavaApp';

	li.append(a);
	return li;
}

//Get and Attach product names to footer
GetFooterProducts = () =>{
	fetchProducts();
	window.addEventListener('load', function() {
		createFooterProducts();
	});
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
	GetFooterProducts(); //Get Footer product names
	GetServices();
	GetProducts();
};

startApp();
