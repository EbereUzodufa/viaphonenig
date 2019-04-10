// Global Declaration
const btnToggle = document.getElementById('btnMobileToggle');
const body = document.body;
let accordion = document.getElementsByClassName('cassavaApp-accordion');
let services = [];
let products = [];
const footerUl = document.getElementById('footer-products');
const overlay = document.querySelector('div.overlay');

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
	if(article){
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

//Create product URL
const productURL = (id) =>{
	return (`./product.html?id=${id}`);
}

//Get individual product(s)
fetchGetProductsHTML = () =>{
	// console.log('product', products);
	const article = document.querySelector('article.viaphone-products');
	if(article){
		products.forEach(product=>{
		// console.log('A prod', product);
		// console.log(`Product ${id}`, `This is the id = ${id}, name = ${name}, image = ${image}, features = ${features}, write-up = ${writeUp}, writeUp-list = ${writeUpList}, featured = ${featured}`);
		// createProductCardHTML(product);
		// console.log('Returned Div',createProductCardHTML(product));
			article.append(createProductCardHTML(product));
		})
	}
}

//Get Featured product(s)
fetchGetFeaturedProductsHTML = () =>{
	// console.log('product', products);
	const article = document.querySelector('article.viaphone-featured-products');
	if(article){
		products.map(product=>{
			if (product.featured == "true"){
				article.append(createProductCardHTML(product));
			}
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
	a.href = productURL(id);
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
		fetchGetFeaturedProductsHTML();
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
	a.href = productURL(product.id);
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

//Set aria-hidden property
SetAriaHidden = (val) =>{
	overlay.setAttribute('aria-hidden', val);
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
	if (setValue == true){
		overlay.style.width = '100%';
		overlay.scrollTop = 0;
		body.classList.add('noScroll');
		SetAriaHidden('false');
	} else{
		overlay.style.width = '0%';
		body.classList.remove('noScroll');
		SetAriaHidden('true');
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

//Set aria-hidden if screen >= 1024px
const SetAriaBAsedOnScreen = () =>{
	const screenWidth = screen.width;
	if (screenWidth >= 1024) {
		SetAriaHidden('false');
	} else {
		SetAriaHidden('true');
	}
}

//Populate Aside with products
const populateAsideProducts = () =>{
	const aside = document.querySelector('aside.viaphone-products');
	if (aside){
		products.map(product=>{
			const a = document.createElement('a');
			a.href = productURL(product.id);
			a.innerHTML = product.name;
			a.classList.add('viaphone-product-link');
			a.role = 'button';

			aside.append(a);
		});
	}
}

//Show clicked product
const displayProduct = () => {
	const id = getProductId();
	if(id) {
		products.map(prod =>{
			if (prod.id == id) {
				document.title = prod.name +' | Viaphone Services Limited - Idea for Everyone';
				selectedProductHTML(prod);
				// return console.log(prod);
			}
		});
	}
	// console.log(id);
}

//Get this product from this ID
getProductId = (url) => {
	let id = 'id';
	if (!url)
	  url = window.location.href;
	id = id.replace(/[\[\]]/g, '\\$&');
	const regex = new RegExp(`[?&]${id}(=([^&#]*)|&|#|$)`),
	  results = regex.exec(url);
	if (!results)
	  return null;
	if (!results[2])
	  return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//HTML of selected product
const selectedProductHTML = (product) => {
	//Select the Section we need
	const productSection = document.querySelector('section.product-info');

	//create the product name
	if (product.name) {
		const productName = document.createElement('h1');
		productName.innerHTML = product.name;
		productName.id = 'product-name';
		productSection.append(productName);
	}

	//Create article in section for features
	if (product.features) {
		//Create article with class features
		const featArticle = document.createElement('article');
		featArticle.classList.add('features');
		productSection.append(featArticle);

		//Create h2 and append to the article
		const featH2 = document.createElement('h2');
		featH2.innerHTML = 'features';
		featArticle.append(featH2);

		//Create ul for features
		const featUl = document.createElement('ul');
		featUl.id = 'viaphone-product-features';
		featArticle.append(featUl);

		//Create List of features
		for(const feature of product.features){
			//Create an li for this feature
			const featLi = document.createElement('li');
			featLi.classList.add('viaphone-product-feature');
			featLi.innerHTML = feature;

			//append li to ul
			featUl.append(featLi);
		}
	}

	//Create article in section for overview
	if (product.writeUp) {
		//Create article with class overiew
		const overviewArticle = document.createElement('article');
		overviewArticle.classList.add('overview');
		productSection.append(overviewArticle);

		//Create h2 and append to the article
		const overviewH2 = document.createElement('h2');
		overviewH2.innerHTML = 'overview';
		overviewArticle.append(overviewH2);

		//create paragraph and append to article
		const overviewPara = document.createElement('p');
		overviewPara.innerHTML = product.writeUp;
		overviewArticle.append(overviewPara);

		//Create oveview List(s) if any 
		if (product.writeUpList) {
			//Create ul for Write up List
			const overviewUl = document.createElement('ul');
			overviewUl.id = 'viaphone-product-overview-lists';
			overviewArticle.append(overviewUl);
	
			//Create List of featyres
			for(const item of product.writeUpList){
				//Create an li for this Write up List
				const overviewLi = document.createElement('li');
				overviewLi.classList.add('viaphone-product-overview-list');
				overviewLi.innerHTML = item;
	
				//append li to ul
				overviewUl.append(overviewLi);
			}
		}
	}
}

// On application start, perform these
const startApp = () => {
	currentYear(); //Get Current Year
	toogleMenuBtn(); //Enable Toggle Menu
	accordionHelper(); //Enable Accordion Show and Hide functionality
	SetAriaBAsedOnScreen();
	GetFooterProducts(); //Get Footer product names
	GetServices();
	GetProducts();
	window.addEventListener('load', function() {
		populateAsideProducts();
	});
};

startApp();
