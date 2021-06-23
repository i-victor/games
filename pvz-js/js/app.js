// app.js

//(c) 2021 github.com/i-victor

'use strict';

$(document).ready(() => {

	let startWorld = 1;
	let startLevel = 1;

	const startGame = (level) => {
			startLevel = level;
			document.getElementById("canvas1").style.display = 'block';
			//const level = document.getElementById('levelSelect').value;
			document.getElementById('lightSlider').style.display = 'none';
			document.getElementById('play').style.display = 'none';
			document.getElementById('levelSlider').style.display = 'none';
			console.log('World:', startWorld, 'Level:', startLevel);
			const game = new Game('canvas1', startWorld, startLevel); // run game
	};

	const worldSelect = (world) => {
		startWorld = world;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	};

	$("#lightSlider").lightSlider({
		item: 2,
		autoWidth: false,
		slideMove: 1, // slidemove will be 1 if loop is true
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
		startGame(1);
	});

	$('#game-level-22').on('click', () => {
		startGame(2);
	});

	$('#game-level-23').on('click', () => {
		startGame(3);
	});

	$('#game-level-24').on('click', () => {
		startGame(4);
	});

});

// #end
