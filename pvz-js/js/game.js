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
let chosenDefender = 1;

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
canvas.addEventListener('mousemove', function(e){
	mouse.x = e.x - canvasPosition.left;
	mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(){
	mouse.y = null;
	mouse.y = null;
});

// game board
const controlsBar = {
	width: canvas.width,
	height: cellSize,
}
class Cell {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize;
	}
	draw(){
		if (mouse.x && mouse.y && collision(this, mouse)){
			ctx.strokeStyle = 'black';
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		}
	}
}
function createGrid(){
	for (let y = cellSize; y < canvas.height; y += cellSize){
		for (let x = 0; x < canvas.width; x += cellSize){
			gameGrid.push(new Cell(x, y));
		}
	}
}
createGrid();
function handleGameGrid(){
	for (let i = 0; i < gameGrid.length; i++){
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

let arrLoadedImages = null;
let arrLoadedImages2 = null;

class Defender {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.shooting = false;
		this.shootNow = false;
		this.health = 100;
		this.projectiles = [];
		this.timer = 0;
		this.frameX = 0;
		this.frameY = 0;
		this.spriteWidth = 70;
		this.spriteHeight = 72;
		this.miniFrame = 0;
		this.maxFrame = 23;
		this.chosenDefender = chosenDefender;
		arrLoadedImages = new personaj();
		arrLoadedImages2 = [];
	}
	draw(){
		//ctx.fillStyle = 'blue';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = 'gold';
		ctx.font = '30px Orbitron';
		//ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
		//ctx.drawImage(defender1, sx, sy, sw, sh, dx, dy, dw, dh);
		if(this.chosenDefender === 1) {
//console.log(defender1);
//console.log(this.frameX);
			arrLoadedImages = new personaj(this.chosenDefender, this.frameX, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
		} else if(this.chosenDefender === 2) {
			arrLoadedImages2 = new personaj(this.chosenDefender, this.frameX, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
		}
	}
	update() {
		if(frame % 6 === 0) {
			if(this.frameX < this.maxFrame) {
				this.frameX++;
//console.log('update', this.frameX);
				this.frameY++
			} else {
				this.frameX = this.miniFrame;
				this.frameY = this.miniFrame;
			}
			if(this.frameX === 10) {
				this.shootNow = true;
			}
		}
		if(this.chosenDefender === 1) {
			if(this.shooting) {
				this.miniFrame = 0;
				this.maxFrame = 23;
			} else {
				this.miniFrame = 0;
				this.maxFrame = 14;
			}
		} else if(this.chosenDefender === 2) {
			this.spriteWidth = 200;
			this.spriteHeight = 195;
			if(this.shooting) {
				this.miniFrame = 0;
				this.maxFrame = 10;
			} else {
				this.miniFrame = 0;
				this.maxFrame = 14;
			}
		}
		if (this.shooting && this.shootNow) {
			let projectile = 0;
			if(this.chosenDefender === 1) {
				projectile = 1;
			} else if(this.chosenDefender === 2) {
				projectile = 2;
			}
			if(projectile) {
				projectiles.push(new Projectile(projectile, this.x + 70, this.y + 50));
			}
			this.shootNow = false;
		}
/* vary projectile each 5 fires
		if (this.shooting && this.shootNow) {
			projectiles.push(new Projectile(1, this.x + 70, this.y + 50));
			this.shootNow = false;
			if (this.shooting){
				this.timer++;
				if (this.timer % 5 === 0){
					projectiles.push(new Projectile(2, this.x + 70, this.y + 50));
				}
			} else {
				this.timer = 0;
			}
		}
*/

	}
}

function handleDefenders(){
	for (let i = 0; i < defenders.length; i++){
		defenders[i].draw();
		defenders[i].update();
		if (enemyPositions.indexOf(defenders[i].y) !== -1){
			defenders[i].shooting = true;
		} else {
			defenders[i].shooting = false;
		}
		for (let j = 0; j < enemies.length; j++){
			if (defenders[i] && collision(defenders[i], enemies[j])){
				enemies[j].movement = 0;
				defenders[i].health -= 1;
			}
			if (defenders[i] && defenders[i].health <= 0){
				defenders.splice(i, 1);
				i--;
				enemies[j].movement = enemies[j].speed;
			}
		}
	}
}

const personaj = class {
	constructor(chosenDefender, frameX, spriteWidth, spriteHeight, x, y, width, height) {
		let arrLoadedImages = [];
		if(chosenDefender === 1) {
			if(frameX > 14) {
				frameX = 0;
			}
			if(arrLoadedImages[frameX] == undefined) {
				arrLoadedImages[frameX] = new Image();
				arrLoadedImages[frameX].src = 'assets/characters/PeaShooter/frames0' + (frameX > 9 ? frameX : '0' + frameX) + '.png';
			}
			if(arrLoadedImages[frameX]) {
//console.log(frameX);
				ctx.drawImage(arrLoadedImages[frameX], 0, 0, spriteWidth, spriteHeight, x, y, width, height);
			}
			//ctx.fillStyle = 'blue';
			//ctx.fillRect(x, y, width, height);
		} else if(chosenDefender === 2) {
			if(!arrLoadedImages[frameX]) {
				arrLoadedImages[frameX] = new Image();
				arrLoadedImages[frameX].src = 'assets/characters/Cactus2/frames0' + (frameX > 9 ? frameX : '0' + frameX) + '.png';
			}
			ctx.drawImage(arrLoadedImages[frameX], 0, 0, spriteWidth, spriteHeight, x, y, width, height);
			//ctx.fillStyle = 'green';
			//ctx.fillRect(x, y, width, height);
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

	let card1stroke = 'black';
	let card2stroke = 'black';

function chooseDefender() {

	if(collision(mouse, card1) && mouse.clicked) {
		chosenDefender = 1;
	} else if(collision(mouse, card2) && mouse.clicked) {
		chosenDefender = 2;
	}

	if(chosenDefender === 1) {
		card1stroke = 'gold';
		card2stroke = 'black';
	} else if(chosenDefender === 2) {
		card1stroke = 'black';
		card2stroke = 'gold';
	} else if(!chosenDefender && mouse.clicked) {
		card1stroke = 'black';
		card2stroke = 'black';
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
	ctx.drawImage(cactus, 0, 0, 194, 194, 75, 7, 194, 194);
}

const bullet = new Image();
bullet.src = 'assets/Bullet.png';

const bullet2 = new Image();
bullet2.src = 'assets/Bullet2.png';

// projectiles
class Projectile {
	constructor(chosenBullet, x, y){
		this.chosenBullet = chosenBullet;
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 20;
		this.speed = 5;
	}
	update(){
		this.x += this.speed;

	}
	draw(){
		if(this.chosenBullet == 1) {
			ctx.drawImage(bullet, this.x, this.y - 40, 25, 24);
		} else if(this.chosenBullet == 2) {
			ctx.drawImage(bullet2, this.x, this.y - 40, 25, 24);
		//ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
		//ctx.fill();
		}
	//console.log(def);
	}
}

function handleProjectiles() {
	for (let i = 0; i < projectiles.length; i++){
		projectiles[i].update();
		projectiles[i].draw();

		for (let j = 0; j < enemies.length; j++){
			if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
				enemies[j].health -= projectiles[i].power;
				projectiles.splice(i, 1);
				i--;
			}
		}

		if (projectiles[i] && projectiles[i].x > canvas.width - cellSize){
			projectiles.splice(i, 1);
			i--;
		}
	}
}

//floating messages
const floatingMessages = [];

class FloatingMessages {
	constructor(value, x, y, size, color) {
		this.value = value;
		this.x = x;
		this.y = y;
		this.size = size;
		this.lifeSpan = 0;
		this.color = color;
		this.opacity = 1;
	}

	update() {
		this.y -= 0.3;
		this.lifeSpan += 1;
		if(this.opacity > 0.03) {
			this.opacity -= 0.03;
		}
	}

	draw() {
		ctx.globalAlpha = this.opacity;
		ctx.fillStyle = this.color;
		ctx.font = this.size + 'px Orbitron';
		ctx.fillText(this.value, this.x, this.y);
		ctx.globalAlpha = 1;
	}
}

function handleFloatingMessages() {
	for(let i = 0; i < floatingMessages.length; i++) {
		floatingMessages[i].update();
		floatingMessages[i].draw();
		if(floatingMessages[i].lifeSpan >= 50) {
			floatingMessages.splice(i, 1);
			i--;
		}
	}
}

// enemies
const enemiesTypes = [];
const enemy1 = new Image();
enemy1.src = 'assets/Enemy.gif';
enemiesTypes.push(enemy1);

const enemy2 = new Image();
enemy2.src = 'assets/Enemy2.gif';
enemiesTypes.push(enemy2);

const enemy3 = new Image();
enemy3.src = 'assets/Enemy4.gif';
enemiesTypes.push(enemy3);

console.log(enemiesTypes);

class Enemy {
	constructor(verticalPosition){
		this.x = canvas.width;
		this.y = verticalPosition;
		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;
		this.speed = Math.random() * 0.2 + 0.4;
		this.movement = this.speed;
		this.health = 100;
		this.maxHealth = this.health;
		this.enemiesTypes = enemiesTypes[Math.floor(Math.random() * enemiesTypes.length)];
		this.frameX = 0;
		this.frameY = 1;
		this.miniFrame = 0;
		this.maxFrame = 15;
		if(this.enemiesTypes === enemy1) {
			//enemy1 property
			this.maxFrame = 15;
			this.spriteWidth = 50;
			this.spriteHeight = 50;
		} else if(this.enemiesTypes === enemy2) {
			//enemy2 properties
			this.maxFrame = 50;
			this.spriteWidth = 100;
			this.spriteHeight = 100;
		} else if(this.enemiesTypes === enemy3) {
			//enemy2 properties
			this.maxFrame = 2;
			this.spriteWidth = 106;
			this.spriteHeight = 126;
		}
	}
	update(){
		this.x -= this.movement;
		if(frame % 5 === 0) {
			if(this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = this.miniFrame;
			}
		}
	}
	draw(){
		//ctx.fillStyle = 'red';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = 'black';
		ctx.font = '30px Orbitron';
		ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
		//ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
		ctx.drawImage(this.enemiesTypes, this.frameX /* this.spriteWidth*/, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

function handleEnemies(){
	for (let i = 0; i < enemies.length; i++){
		enemies[i].update();
		enemies[i].draw();
		if (enemies[i].x < 0){
			gameOver = true;
		}
		if (enemies[i].health <= 0){
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
	if (frame % enemiesInterval === 0 && score < winningScore){
		let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
		enemies.push(new Enemy(verticalPosition));
		enemyPositions.push(verticalPosition);
		if (enemiesInterval > 120) enemiesInterval -= 50;
	}
}

// resources

sun = new Image();
sun.src = 'assets/sun.png';

const amounts = [50];
class Resource {
	constructor(){
		this.x = Math.random() * (canvas.width - cellSize);
		this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
		this.width = cellSize * 0.6;
		this.height = cellSize * 0.6;
		this.amount = amounts[Math.floor(Math.random() * amounts.length)];
	}
	draw(){
		//ctx.fillStyle = 'yellow';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(sun, this.x, this.y, this.width, this.height);
		ctx.font = '20px Orbitron';
		//ctx.fillText(this.amount, this.x + 15, this.y + 25);
	}
}
function handleResources(){
	if (frame % 500 === 0 && score < winningScore){
		resources.push(new Resource());
	}
	for (let i = 0; i < resources.length; i++){
		resources[i].draw();
		if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)){
			numberOfResources += resources[i].amount;
			floatingMessages.push(new FloatingMessages('+' + resources[i].amount, resources[i].x, resources[i].y, 30, 'black'));
			floatingMessages.push(new FloatingMessages('+' + resources[i].amount, 470, 85, 30, 'gold'));
			resources.splice(i, 1);
			i--;
		}
	}
}

// utilities

function handleGameStatus(){
	ctx.fillStyle = 'gold';
	ctx.font = '30px Orbitron';
	ctx.fillText('Score: ' + score, 180, 40);
	ctx.fillText('Resources: ' + numberOfResources, 180, 80);
	if (gameOver){
		ctx.fillStyle = 'black';
		ctx.font = '90px Orbitron';
		ctx.fillText('GAME OVER', 135, 330);
	}
	if (score >= winningScore && enemies.length === 0){
		ctx.fillStyle = 'black';
		ctx.font = '60px Orbitron';
		ctx.fillText('LEVEL COMPLETE', 130, 300);
		ctx.font = '30px Orbitron';
	}
}

canvas.addEventListener('click', function(){
	const gridPositionX = mouse.x  - (mouse.x % cellSize) + cellGap;
	const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
	if (gridPositionY < cellSize) return;
	for (let i = 0; i < defenders.length; i++){
		if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) return;
	}
	let defenderCost;

	if(chosenDefender === 1) {
		defenderCost = 100;
	} else if(chosenDefender === 2) {
		defenderCost = 250;
	}
	if (numberOfResources >= defenderCost){
		defenders.push(new Defender(gridPositionX, gridPositionY));
		numberOfResources -= defenderCost;
	} else {
		floatingMessages.push(new FloatingMessages('Need more resources', mouse.x, mouse.y, 20, 'red'));
	}
});

var background = new Image();
background.src = "assets/bg.jpeg";

var head = new Image();
head.src = "assets/progressBar.png";

// Make sure the image is loaded first otherwise nothing will draw.

function bg(){
	ctx.drawImage(background,0,0);
	ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
	ctx.fillRect(480, 60, 240, 18);
	ctx.drawImage(head, bar, 55);
	if(bar < 700) {
		bar+= 0.028;
	} else {
		bar = 700;
		return;
	}
}

function animate(){
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = 'blue';
	//ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
	bg();
	handleGameGrid();
	handleDefenders();
	handleResources();
	handleProjectiles();
	handleEnemies();
	chooseDefender()
	handleGameStatus();
	handleFloatingMessages();
	frame+=0.5;
	if (!gameOver) {
		requestAnimationFrame(animate);
	}
}
animate();

function collision(first, second){
	if (	!(  first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first.y > second.y + second.height ||
				first.y + first.height < second.y)
	) {
	return true;
	};
};

window.addEventListener('resize', function(){
	canvasPosition = canvas.getBoundingClientRect();
})
