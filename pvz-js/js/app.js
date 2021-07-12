// app.js

//(c) 2021 github.com/i-victor

'use strict';

$(document).ready(() => {

	let startWorld = 1;
	let startLevel = 1;
	let gameDeck = [];

	const startGame = () => {
		$('#play').hide();
		//const level = document.getElementById('levelSelect').value;
		$('#container-deckSelect').hide();
		$('#container-worldSelect').hide();
		$('#container-levelSlider').hide();
		$('#game-canvas').show();
		console.log('World:', startWorld, 'Level:', startLevel);
		const game = new Game('game-canvas', startWorld, startLevel); // run game
	};

	$('#button-startGame').on('click', () => {
		deckSelect();
	});

	const deckSelect = () => {
		console.log(gameDeck);
		if(gameDeck.length < 2) {
			alert('Must select 2 characters !');
			return;
		}
		startGame();
	};

	const levelSelect = (level) => {
		startLevel = level;
		$('#container-deckSelect').show();
		$('#container-deckSelect img.card').imgCheckbox({
			maxSelect: 2, // allow select max 2 cards
			onclick: ($el, isSelected) => {
				const id = $el.find('img').attr('id');
				console.log(id, isSelected);
				if(isSelected === true) {
					if(gameDeck.length < 2) {
						gameDeck.push(id);
					} else if(gameDeck.length > 2) {
						gameDeck.pop();
					}
				} else {
					let tmpArr = [];
					for(let i=0; i<gameDeck.length; i++) {
						if(gameDeck[i] !== id) {
							tmpArr.push(gameDeck[i]);
						}
					}
					gameDeck = tmpArr;
					tmpArr = null;
				}
			}
		});
		$('#container-worldSelect').hide();
		$('#container-levelSlider').hide();
	};

	const worldSelect = (world) => {
		startWorld = world;
		$('#container-deckSelect').hide();
		$('#container-worldSelect').hide();
		$('#container-levelSlider').show();
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
