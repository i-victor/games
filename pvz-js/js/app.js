// app.js

//(c) 2021 github.com/i-victor

'use strict';

const startGame = (world, level) => {
		document.getElementById("canvas1").style.display = 'block';
		//const level = document.getElementById('levelSelect').value;
		document.getElementById('lightSlider').style.display = 'none';
		document.getElementById('play').style.display = 'none';
		document.getElementById('levelSlider').style.display = 'none';
		//console.log(world, level);
		const game = new Game('canvas1', world, level); // run game

};

$(document).ready(function() {

	let world = 1;

	$("#lightSlider").lightSlider({
		item: 2,
		autoWidth: false,
		slideMove: 1, // slidemove will be 1 if loop is true
		slideMargin: 10,
	});

	$('#game-world-1').on('click', () => {
		world = 1;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 3,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-2').on('click', () => {
		world = 2;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-3').on('click', () => {
		world = 3;
	});

	$('#game-world-4').on('click', () => {
		world = 4;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-5').on('click', () => {
		world = 5;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-6').on('click', () => {
		world = 6;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-7').on('click', () => {
		world = 7;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-8').on('click', () => {
		world = 8;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-9').on('click', () => {
		world = 9;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-10').on('click', () => {
		world = 10;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-11').on('click', () => {
		world = 11;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-world-12').on('click', () => {
		world = 12;
		document.getElementById("lightSlider").style.display = 'none';
		document.getElementById("levelSlider").style.display = 'block';
		$("#levelSlider").lightSlider({
			item: 2,
			autoWidth: false,
			slideMove: 1, // slidemove will be 1 if loop is true
			slideMargin: 10,
		});
	});

	$('#game-level-21').on('click', () => {
		startGame(world, 1);
	});

	$('#game-level-22').on('click', () => {
		startGame(world, 2);
	});

	$('#game-level-23').on('click', () => {
		startGame(world, 3);
	});

	$('#game-level-24').on('click', () => {
		startGame(world, 4);
	});

});

// #end
