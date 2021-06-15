// app.js

//(c) 2021 github.com/i-victor

'use strict';

(() => {


document.getElementById("show").addEventListener("click", () => {
	document.getElementById("canvas1").style.display = 'block';
	const level = document.getElementById('levelSelect').value;
	const world = document.getElementById('worldSelect').value;
	console.log(world);
	const game = new Game('canvas1', world, level); // run game
}, false);

})();

// #end
