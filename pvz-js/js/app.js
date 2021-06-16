// app.js

//(c) 2021 github.com/i-victor

'use strict';

const startGame = (world) => {

//	document.getElementById("show").addEventListener("click", () => {
		document.getElementById("canvas1").style.display = 'block';
		const level = document.getElementById('levelSelect').value;
	//	const world = document.getElementById('worldSelect').value;
		console.log(world);
		const game = new Game('canvas1', world, level); // run game
//	}, false);

};

$(document).ready(function() {

	$("#lightSlider").lightSlider({
		item: 2,
		autoWidth: false,
		slideMove: 1, // slidemove will be 1 if loop is true
		slideMargin: 10,
	});

	$('#game-world-1').on('click', () => {
		startGame(1);
	});

	$('#game-world-2').on('click', () => {
		startGame(2);
	});

	$('#game-world-3').on('click', () => {
		startGame(3);
	});

});

// #end
