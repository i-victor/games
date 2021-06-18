// app.js

//(c) 2021 github.com/i-victor

'use strict';

const startGame = (world, level) => {
		document.getElementById("canvas1").style.display = 'block';
		//const level = document.getElementById('levelSelect').value;
		document.getElementById('lightSlider').style.display = 'none';
		document.getElementById('play').style.display = 'none';
		document.getElementById('levelSelect').style.display = 'none';
		console.log(world, level);
		const game = new Game('canvas1', world, level); // run game

};

$(document).ready(function() {

	$("#lightSlider").lightSlider({
		item: 2,
		autoWidth: false,
		slideMove: 1, // slidemove will be 1 if loop is true
		slideMargin: 10,
	});

	$('#game-world-1').on('click', () => {
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-2').on('click', () => {
		startGame(2, level);
	});

	$('#game-world-3').on('click', () => {
		startGame(3, level);
	});

	$('#game-world-4').on('click', () => {
		startGame(4, level);
	});

	$('#game-world-5').on('click', () => {
		startGame(5, level);
	});

	$('#game-world-6').on('click', () => {
		startGame(6, level);
	});

	$('#game-world-7').on('click', () => {
		startGame(7, level);
	});

	$('#game-world-8').on('click', () => {
		startGame(8, level);
	});

	$('#game-world-9').on('click', () => {
		startGame(9, level);
	});

	$('#game-world-10').on('click', () => {
		startGame(10, level);
	});

	$('#game-world-11').on('click', () => {
		startGame(11, level);
	});

	$('#game-world-12').on('click', () => {
		startGame(12, level);
	});

	$('#game-level-1').on('click', () => {
		startGame(world, 1);
	});

	$('#game-level-2').on('click', () => {
		startGame(world, 2);
	});

	$('#game-level-3').on('click', () => {
		startGame(world, 3);
	});

	$('#game-level-4').on('click', () => {
		startGame(world, 4);
	});

});

// #end
