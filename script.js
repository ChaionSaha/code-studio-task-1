'use strict';
const cardConatiner = document.querySelector('.card-container');
const storedCart = JSON.parse(localStorage.getItem('stored-cart'));
const cartContainer = document.querySelector('.cart-container');
const shoppingCart = document.querySelector('.shopping-cart');
const showCart = document.querySelector('.cart');

let quantity = 0;
let totalPrice = 0;
let totalVat = 0;
let grandTotal = 0;
let cart = {};
if (storedCart) cart = storedCart;

/////////////////////////////////////////////////////////////
///// Products List
function getJSON() {
	return fetch(
		'https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json'
	)
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		});
}

async function caller() {
	const json = await getJSON();

	json.forEach((product, i) => {
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `<img class="img" src=${product.img}> 
		<p class="name">প্রোডাক্ট ${i + 1}</p>
		<div class="btns"> 
		<p class="price"><span> &#2547;</span> ${product.price} </p>
		<p class='id'>${product.id}</p>
		<button class='addToCart'>Buy</button>
		</div>
		<a class="details">View Details</a>
		
		`;

		cardConatiner.appendChild(card);
	});

	const updateCart = (sentCart = {}) => {
		quantity = 0;
		totalPrice = 0;
		totalVat = 0;
		grandTotal = 0;
		for (const item in sentCart) {
			// console.log(item);
			quantity += sentCart[item];
			let selectedProduct = json.find((p) => p.id == item);
			selectedProduct.quantity = sentCart[item];
			totalPrice += selectedProduct.price * selectedProduct.quantity;
			totalVat = totalPrice * (1 / 100);
			grandTotal = totalPrice + totalVat;
		}
		showCart.innerHTML = ``;

		showCart.innerHTML = `<h1>কার্ট</h1>
			<p class='quantity'>মোট আইটেম: ${quantity}</p>
			<p class='total-price'>মূল্য: ${totalPrice}&#2547;</p>
			<p class='total-vat'>ভ্যাট: ${totalVat}&#2547;</p>
			<p class='grand-total'>মোট মূল্য: ${grandTotal}&#2547;</p>
			<button class="clear-cart"> Clear Cart</button>
			`;

		localStorage.setItem('stored-cart', JSON.stringify(cart));
	};

	updateCart(cart);

	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const id = e.target.parentElement.children[1].innerText;
			if (cart[id]) {
				cart[id] += 1;
			} else {
				cart[id] = 1;
			}
			updateCart(cart);
		}

		if (e.target.classList.contains('clear-cart')) {
			cart = {};
			updateCart(cart);
		}
	});
}

caller();

///////////////////////////////////////////////////////////
///// Cart Portion

shoppingCart.addEventListener('click', (e) => {
	e.preventDefault();
	if (cartContainer.classList.contains('hidden')) {
		cartContainer.classList.remove('hidden');
	} else {
		cartContainer.classList.add('hidden');
	}
});

////////////////////////////////////////////////////////
//////////// Cart
