// app.js

//(c) 2021 github.com/i-victor

'use strict';

$(document).ready(() => {

	let startWorld = 1;
	let startLevel = 1;

	const startGame = (level) => {
			startLevel = level;
			document.getElementById('play').style.display = 'none';
			//const level = document.getElementById('levelSelect').value;
			document.getElementById("container-deckSelect").style.display = 'none';
			document.getElementById('container-worldSelect').style.display = 'none';
			document.getElementById('container-levelSlider').style.display = 'none';
			document.getElementById("game-canvas").style.display = 'block';
			console.log('World:', startWorld, 'Level:', startLevel);
			const game = new Game('game-canvas', startWorld, startLevel); // run game
	};

	const levelSelect = (level) => {
		startGame(level);
	};

	const worldSelect = (world) => {
		startWorld = world;
		document.getElementById("container-deckSelect").style.display = 'none';
		document.getElementById("container-worldSelect").style.display = 'none';
		document.getElementById("container-levelSlider").style.display = 'block';
		$("#slider-levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	};

	$("#slider-worldSelect").lightSlider({
		item: 4,
		autoWidth: false,
		slideMove: 2, // slidemove will be 1 if loop is true
		slideMargin: 10,
	});

	$('#game-world-1').on('click', () => {
		worldSelect(1);
	});

	$('#game-world-2').on('click', () => {
		worldSelect(2);
	});

	$('#game-world-3').on('click', () => {
		worldSelect(3);
	});

	$('#game-world-4').on('click', () => {
		worldSelect(4);
	});

	$('#game-world-5').on('click', () => {
		worldSelect(5);
	});

	$('#game-world-6').on('click', () => {
		worldSelect(6);
	});

	$('#game-world-7').on('click', () => {
		worldSelect(7);
	});

	$('#game-world-8').on('click', () => {
		worldSelect(8);
	});

	$('#game-world-9').on('click', () => {
		worldSelect(9);
	});

	$('#game-world-10').on('click', () => {
		worldSelect(10);
	});

	$('#game-world-11').on('click', () => {
		worldSelect(11);
	});

	$('#game-world-12').on('click', () => {
		worldSelect(12);
	});

	$('#game-level-21').on('click', () => {
		levelSelect(1);
	});

	$('#game-level-22').on('click', () => {
		levelSelect(2);
	});

	$('#game-level-23').on('click', () => {
		levelSelect(3);
	});

	$('#game-level-24').on('click', () => {
		levelSelect(4);
	});

});

// #end
