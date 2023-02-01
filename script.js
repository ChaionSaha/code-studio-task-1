'use strict';
const cardConatiner = document.querySelector('.card-container');

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
		<button>Buy</button>
		</div>
		<a class="details">View Details</a>
		`;

		cardConatiner.appendChild(card);
	});
}

caller();
