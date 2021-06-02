// game.js

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;

let numberOfResources = 500;
let enemiesInterval = 600;
let frame = 0;
let bar = 470;
let gameOver = false;
let score = 0;
const winningScore = 200;
let chosenDefender = 0;

const gameGrid = [];
const defenders = [];
const enemies = [];
const enemyPositions = [];
const projectiles = [];
const resources = [];

// mouse
const mouse = {
	x: 10,
	y: 10,
	width: 0.1,
	height: 0.1,
	clicked: false
}
canvas.addEventListener('mousedown', function() {
		mouse.clicked = true;
	});

canvas.addEventListener('mouseup', function() {
		mouse.clicked = false;
	});

let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e) {
	mouse.x = e.x - canvasPosition.left;
	mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function() {
	mouse.y = null;
	mouse.y = null;
});

// game board
const controlsBar = {
	width: canvas.width,
	height: cellSize,
}
class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize;
	}
	draw() {
		if(mouse.x && mouse.y && collision(this, mouse)) {
			ctx.strokeStyle = 'black';
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		}
	}
}
function createGrid() {
	for(let y = cellSize; y < canvas.height; y += cellSize) {
		for(let x = 0; x < canvas.width; x += cellSize) {
			gameGrid.push(new Cell(x, y));
		}
	}
}
createGrid();
function handleGameGrid() {
	for(let i = 0; i < gameGrid.length; i++) {
		gameGrid[i].draw();
	}
}

// defenders

let defenderArray = [];

const defender1 = new Image();
defender1.src = 'assets/characters/PeaShooter/frames000.png'; // convert 'PeaShooter.gif[0-14]' frames%03d.png
defenderArray.push(defender1);

const defender2 = new Image();
defender2.src = 'assets/characters/Cactus2/frames000.png'; // convert 'Cactus2.gif[0-14]' frames%03d.png
defenderArray.push(defender2);

const defender3 = new Image();
defender3.src = 'assets/characters/SunFlower/frames000.png'; // convert 'SunFlower.gif[0-14]' frames%03d.png
defenderArray.push(defender3);

let characterNumber1 = null;
let characterNumber2 = null;
let characterNumber3 = null;

const amounts = [50];

function handleDefenders() {
	for(let i = 0; i < defenders.length; i++) {
		defenders[i].draw(ctx);
		let projectile = defenders[i].update(frame);
		let resource = defenders[i].resource();
		if(projectile) {
			projectiles.push(new Projectile(projectile, defenders[i].x + 70, defenders[i].y + 50));
		}
		if(resource === 1) {
			//alert('salut');
			if(frame % 300 === 0) {
				//console.log('123');
				resources.push(new Resource(defenders[i].x, defenders[i].y, amounts)); // TODO: resources.push to change as Game.resources.push
			}
		}
		if(enemyPositions.indexOf(defenders[i].y) !== -1) {
			defenders[i].shooting = true;
		} else {
			defenders[i].shooting = false;
		}
		for(let j = 0; j < enemies.length; j++) {
			if(defenders[i] && collision(defenders[i], enemies[j])) {
				enemies[j].movement = 0;
				defenders[i].health -= 1;
			}
			if(defenders[i] && defenders[i].health <= 0) {
				defenders.splice(i, 1);
				i--;
				enemies[j].movement = enemies[j].speed;
			}
		}
	}
}


const cactus = new Image();
cactus.src = 'assets/Cactus.gif';

const card1 = {
	x:10,
	y:10,
	width:70,
	height: 85
}

const card2 = {
	x:90,
	y:10,
	width:70,
	height: 85
}

const card3 = {
	x:170,
	y:10,
	width:70,
	height: 85
}

	let card1stroke = 'black';
	let card2stroke = 'black';
	let card3stroke = 'black';

function chooseDefender() {

	if(mouse.clicked) {
	//	chosenDefender = 0;
		if(collision(mouse, card1)) {
			chosenDefender = 1;
		} else if(collision(mouse, card2)) {
			chosenDefender = 2;
		} else if(collision(mouse, card3)) {
			chosenDefender = 3;
		}
	}
//console.log('chosenDefender', chosenDefender);
	if(chosenDefender === 1) {
		card1stroke = 'gold';
		card2stroke = 'black';
		card3stroke = 'black';
	} else if(chosenDefender === 2) {
		card1stroke = 'black';
		card2stroke = 'gold';
		card3stroke = 'black';
	} else if(chosenDefender === 3) {
		card1stroke = 'black';
		card2stroke = 'black';
		card3stroke = 'gold';
	} else {
		card1stroke = 'black';
		card2stroke = 'black';
		card3stroke = 'black';
	}

	ctx.lineWidth = 1;
	ctx.fillStyle = "rgba(0, 0, 0, 0.4)";

	ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
	ctx.strokeStyle = card1stroke;
	ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
	ctx.drawImage(defender1, 0, 0, 194, 194, 6, 12, 194, 194);

	ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
	ctx.strokeStyle = card2stroke;
	ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
	ctx.drawImage(cactus, 0, 0, 194, 194, 90, 7, 160, 184);

	ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
	ctx.strokeStyle = card3stroke;
	ctx.strokeRect(card3.x, card3.y, card3.width, card3.height);
	ctx.drawImage(defender3, 0, 0, 194, 194, 172, 10, 194, 194);
}

// projectiles


function handleProjectiles() {
	for(let i = 0; i < projectiles.length; i++) {
		projectiles[i].update();
		projectiles[i].draw(ctx);

		for(let j = 0; j < enemies.length; j++) {
			if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
				enemies[j].health -= projectiles[i].power;
				projectiles.splice(i, 1);
				i--;
			}
		}

		if(projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
			projectiles.splice(i, 1);
			i--;
		}
	}
}

//floating messages
const floatingMessages = [];

function handleFloatingMessages() {
	for(let i = 0; i < floatingMessages.length; i++) {
		floatingMessages[i].update();
		floatingMessages[i].draw(ctx);
		if(floatingMessages[i].lifeSpan >= 50) {
			floatingMessages.splice(i, 1);
			i--;
		}
	}
}

// enemies
const enemiesTypes = [];
let enemy1 = []; // convert 'Enemy.gif[0-15]' frames%03d.png
enemiesTypes.push(enemy1);
/*
const enemy2 = new Image();
enemy2.src = 'assets/Enemy2.gif';
enemiesTypes.push(enemy2);

const enemy3 = new Image();
enemy3.src = 'assets/Enemy4.gif';
enemiesTypes.push(enemy3);
*/
//console.log(enemiesTypes);


function handleEnemies() {
	for(let i = 0; i < enemies.length; i++) {
		enemies[i].update(frame);
		enemies[i].draw(ctx);
		if(enemies[i].x < 0) {
			gameOver = true;
		}
		if(enemies[i].health <= 0) {
			let gainedResources = enemies[i].maxHealth/10;
			floatingMessages.push(new FloatingMessages('+' + gainedResources, enemies[i].x, enemies[i].y, 30, 'black'));
			floatingMessages.push(new FloatingMessages('+' + gainedResources, 470, 85, 30, 'gold'));
			numberOfResources += gainedResources;
			score += gainedResources;
			const findThisIndex = enemyPositions.indexOf(enemies[i].y);
			enemyPositions.splice(findThisIndex, 1);
			enemies.splice(i, 1);
			i--;
		  }
	}
	if(frame % enemiesInterval === 0 && score < winningScore) {
		let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
		enemies.push(new Enemy(canvas.width, verticalPosition, cellSize, cellGap));
		enemyPositions.push(verticalPosition);
		if(enemiesInterval > 120) {
			enemiesInterval -= 50;
		}
	}
}

// resources

function handleResources() {
	if(frame % 600 === 0 && score < winningScore) {
		resources.push(new Resource()); // random, pt ca e fara parametri
	}
	for(let i = 0; i < resources.length; i++) {
		resources[i].draw(ctx);
		if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)) {
			numberOfResources += resources[i].amount;
			floatingMessages.push(new FloatingMessages('+' + resources[i].amount, resources[i].x, resources[i].y, 30, 'black'));
			floatingMessages.push(new FloatingMessages('+' + resources[i].amount, 470, 85, 30, 'gold'));
			resources.splice(i, 1);
			i--;
		}
	}
}

// utilities

function handleGameStatus() {
	ctx.fillStyle = 'gold';
	ctx.font = '30px Orbitron';
	ctx.fillText('Score: ' + score, 280, 40);
	ctx.fillText('Resources: ' + numberOfResources, 280, 80);
	if(gameOver) {
		ctx.fillStyle = 'black';
		ctx.font = '90px Orbitron';
		ctx.fillText('GAME OVER', 135, 330);
	}
	if(score >= winningScore && enemies.length === 0) {
		ctx.fillStyle = 'black';
		ctx.font = '60px Orbitron';
		ctx.fillText('LEVEL COMPLETE', 130, 300);
		ctx.font = '30px Orbitron';
	}
}

canvas.addEventListener('click', function() {
	const gridPositionX = mouse.x  - (mouse.x % cellSize) + cellGap;
	const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
	if(gridPositionY < cellSize) {
		return;
	}
	for(let i = 0; i < defenders.length; i++) {
		if(defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) {
			return;
		}
	}
	let defenderCost = 0;
	if(chosenDefender === 1) {
		defenderCost = 100;
	} else if(chosenDefender === 2) {
		defenderCost = 250;
	} else if(chosenDefender === 3) {
		defenderCost = 50;
	}
//console.log('chosenDefender=', chosenDefender, 'numberOfResources=', numberOfResources, 'defenderCost=', defenderCost);
	if(defenderCost > 0) {
		if(numberOfResources >= defenderCost) {
			defenders.push(new Defender(chosenDefender, gridPositionX, gridPositionY, cellSize, cellGap));
			numberOfResources -= defenderCost;
		} else {
			floatingMessages.push(new FloatingMessages('Need more resources', mouse.x, mouse.y, 20, 'red'));
		}
	}
});

var background = new Image();
background.src = "assets/bg.jpeg";

var head = new Image();
head.src = "assets/progressBar.png";

// Make sure the image is loaded first otherwise nothing will draw.

function bg() {
	ctx.drawImage(background,0,0);
	/*ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
	ctx.fillRect(480, 60, 240, 18);
	ctx.drawImage(head, bar, 55);
	if(bar < 700) {
		bar+= 0.028;
	} else {
		bar = 700;
		return;
	} */
}

function animate() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = 'blue';
	//ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
	bg();
	handleGameGrid();
	handleDefenders();
	handleResources();
	handleProjectiles();
	handleEnemies();
	chooseDefender();
	handleGameStatus();
	handleFloatingMessages();
	frame+=0.5;
	//console.log(frame);
	if(!gameOver) {
		requestAnimationFrame(animate);
	}
}
animate();

function collision(first, second) {
	if (	!(  first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first.y > second.y + second.height ||
				first.y + first.height < second.y)
	) {
	return true;
	};
};

window.addEventListener('resize', function() {
	canvasPosition = canvas.getBoundingClientRect();
});

// #end
