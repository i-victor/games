// Game.js

//(c) 2021 github.com/i-victor

//console.log('Game.js loaded ok');

const Game = class {

	constructor(canvasId, world, level, gameDeck) { // STATIC CLASS
		const _$name = 'Game';
		const _$class = this;
		if(level == undefined) {
			level = 0;
		}

		if(canvasId == undefined) {
			console.error(_$name, 'CanvasID is undefined ...');
			return;
		}
		let testCanvas = null;
		try {
			testCanvas = document.getElementById(String(canvasId));
		} catch(err) {
			console.error(_$name, 'Cannot Find Canvas ID:', canvasId);
			return;
		}
		if(!testCanvas) {
			console.error(_$name, 'Canvas is NULL');
			return;
		}

		let winningScore = 200;

	if(world === 1) {
		if(level === 1) {
			winningScore = 200;
		} else if(level === 2) {
			winningScore = 400;
		} else if(level === 3) {
			winningScore = 600;
		} else if(level === 4) {
			winningScore = 800;
		} else if(level === 5) {
			winningScore = 1000;
		}
	}

		const canvas = testCanvas;
		testCanvas = null;

		const ctx = canvas.getContext('2d');
		canvas.width = 900;
		canvas.height = 600;

		// global variables
		const cellSize = 100;
		const cellGap = 3;

		let chosenDefender = 0;
		let numberOfResources = 500;
		let enemiesInterval = 600;
		let frame = 0;
		let bar = 470;
		let gameOver = false;
		let score = 0;
//		console.log(level);

//		console.log(winningScore);

		const gameGrid = [];
		const defenders = [];
		const enemies = [];
		const enemyPositions = [];
		const projectiles = [];
		const resources = [];

		let shovelSelect = false;

//console.log(enemies);

		// mouse
		const mouse = {
			x: 10,
			y: 10,
			width: 0.1,
			height: 0.1,
			clicked: false
		};

		canvas.addEventListener('mousedown', () => {
			mouse.clicked = true;
		});

		canvas.addEventListener('mouseup', () => {
			mouse.clicked = false;
		});

		let canvasPosition = canvas.getBoundingClientRect();
		canvas.addEventListener('mousemove', (e) => {
			mouse.x = e.x - canvasPosition.left;
			mouse.y = e.y - canvasPosition.top;
		});
		canvas.addEventListener('mouseleave', () => {
			mouse.y = null;
			mouse.y = null;
		});

		const collision = (first, second) => {
			if(
				! (
					first.x > second.x + second.width ||
					first.x + first.width < second.x ||
					first.y > second.y + second.height ||
					first.y + first.height < second.y
				)
			) {
				return true;
			}
		};
		_$class.collision = collision;

		// game board
		const controlsBar = {
			width: canvas.width,
			height: cellSize,
		};

		const createGrid = () => {
			for(let y = cellSize; y < canvas.height; y += cellSize) {
				for(let x = 0; x < canvas.width; x += cellSize) {
					gameGrid.push(new Cell(x, y, cellSize));
				}
			}
		};
		createGrid();

		const handleGameGrid = () => {
			for(let i = 0; i < gameGrid.length; i++) {
				gameGrid[i].draw(ctx, mouse, collision);
			}
		};

		// defenders

		let defenderArray = [];

	//	console.log(gameDeck);
		let defender = null;
		for(let d=0; d<gameDeck.length; d++) {
			defender = new Image();
			defender.src = 'assets/characters/' + gameDeck[d] + '.png';
			defenderArray.push(defender);
		}
		defender = null;

		/*
		const defender1 = new Image();
		defender1.src = 'assets/characters/PeaShooter/frames000.png'; // convert 'PeaShooter.gif[0-14]' frames%03d.png
		defenderArray.push(defender1);

		const defender2 = new Image();
		defender2.src = 'assets/characters/Cactus2/frames000.png'; // convert 'Cactus2.gif[0-14]' frames%03d.png
		defenderArray.push(defender2);

		const defender3 = new Image();
		defender3.src = 'assets/characters/SunFlower/frames000.png'; // convert 'SunFlower.gif[0-14]' frames%03d.png
		defenderArray.push(defender3);
		*/

		const amounts = [ 50 ];

		const handleDefenders = () => {
			for(let i = 0; i < defenders.length; i++) {
				defenders[i].draw(ctx);
				let projectile = defenders[i].update(frame);
				let resource = defenders[i].resource();
				if(projectile) {
					projectiles.push(new Projectile(projectile, defenders[i].x + 70, defenders[i].y + 50));
				}
				if(resource === 1) {
					//alert('salut');
					if(frame % 600 === 0) {
						//console.log('123');
						resources.push(new Resource(canvas, cellSize, defenders[i].x, defenders[i].y, amounts)); // TODO: resources.push to change as Game.resources.push
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
		};

		const cactus = new Image();
		cactus.src = 'assets/Cactus.gif';

		const shovel = new Image();
		shovel.src = 'assets/Shovel.gif';

		const shovelCard = {
			x: 800,
			y: 20,
			width: 85,
			height: 65,
		}

		let card1stroke = 'black';
		let card2stroke = 'black';
		let card3stroke = 'black';
		let shovelCardstroke = 'black';

		const handleShovel = () => {

			if(mouse.clicked) {
				if(collision(mouse, shovelCard)) {
					shovelSelect = true;
				} else if(chosenDefender !== shovel) {
					shovelSelect = false;
				}
			}

			for(let i = 0; i < defenders.length; i++) {

				if(shovelSelect === true && collision(mouse, defenders[i])) {
					if(mouse.clicked) {
						defenders.splice(i, 1);
						numberOfResources += 100;
						shovelSelect = false;
						chosenDefender = 0;
						shovelCardstroke = 'black';
					}
				}
			}

		}

		const card1 = {
			x: 10,
			y: 10,
			width: 70,
			height: 85,
			defender: 0,
		};

		const card2 = {
			x: 90,
			y: 10,
			width: 70,
			height: 85,
			defender: 0,
		};

		const card3 = {
			x: 170,
			y: 10,
			width: 70,
			height: 85,
			defender: 0,
		};

		let chosenShovel = 1;

		const chooseDefender = () => {

			if(mouse.clicked) {
				if(collision(mouse, card1)) {
					console.log('Card1', card1.defender);
					chosenDefender = card1.defender;
					card1stroke = 'gold';
					card2stroke = 'black';
					card3stroke = 'black';
					shovelCardstroke = 'black';
				} else if(collision(mouse, card2)) {
					console.log('Card2', card2.defender);
					chosenDefender = card2.defender;
					card1stroke = 'black';
					card2stroke = 'gold';
					card3stroke = 'black';
					shovelCardstroke = 'black';
				} else if(collision(mouse, card3)) {
					console.log('Card3', card3.defender);
					chosenDefender = card3.defender;
					card1stroke = 'black';
					card2stroke = 'black';
					card3stroke = 'gold';
					shovelCardstroke = 'black';
				}else if(collision(mouse, shovelCard)) {
					chosenDefender = shovel;
					card1stroke = 'black';
					card2stroke = 'black';
					card3stroke = 'black';
					shovelCardstroke = 'gold';
				} else {
					card1stroke = 'black';
					card2stroke = 'black';
					card3stroke = 'black';
					shovelCardstroke = 'black';
				}
			}

			ctx.lineWidth = 1;
			ctx.fillStyle = "rgba(0, 0, 0, 0.4)";

			const getDefenderNumByName = (name) => {
console.log('getDefenderNumByName:', name);
				switch(name) {
					case 'PeaShooter2':
						return 1;
					case 'Cactus2':
						return 2;
					case 'SunFlower':
						return 3;
					case 'StarFruit':
						return 4;
					case 'SeaShroom':
						return 5;
					case 'LotusRoot':
						return 6;
					case 'Plantern':
						return 7;
					case 'GloomShroom':
						return 8;
				}
				return 0;
			};

			//--
			let defenderNum = 0;
			for(let d=0; d<defenderArray.length; d++) {
				defenderNum += 1;
				if(defenderNum === 1) {
					card1.defender = getDefenderNumByName(gameDeck[0]);
					ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
					ctx.strokeStyle = card1stroke;
					ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
					ctx.drawImage(defenderArray[d], 0, 0, 194, 194, 12, 14, 194, 194);
				} else if(defenderNum === 2) {
					card2.defender = getDefenderNumByName(gameDeck[1]);
					ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
					ctx.strokeStyle = card2stroke;
					ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
					ctx.drawImage(defenderArray[d], 0, 0, 194, 194, 92, 14, 194, 194);
				} else if(defenderNum === 3) {
					card3.defender = getDefenderNumByName(gameDeck[2]);
					ctx.fillRect(card3.x, card3.y, card3.width, card3.height);
					ctx.strokeStyle = card3stroke;
					ctx.strokeRect(card3.x, card3.y, card3.width, card3.height);
					ctx.drawImage(defenderArray[d], 0, 0, 194, 194, 172, 14, 194, 194);
				} else {
					break;
				}
			}
			//--

			ctx.fillRect(shovelCard.x, shovelCard.y, shovelCard.width, shovelCard.height);
			ctx.strokeStyle = shovelCardstroke;
			ctx.strokeRect(shovelCard.x, shovelCard.y, shovelCard.width, shovelCard.height);
			ctx.drawImage(shovel, 0, 0, 194, 194, 805, 35, 194, 194);

		};

		// projectiles

		const handleProjectiles = () => {
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
		};

		//floating messages
		const floatingMessages = [];

		const handleFloatingMessages = () => {
			for(let i = 0; i < floatingMessages.length; i++) {
				floatingMessages[i].update();
				floatingMessages[i].draw(ctx);
				if(floatingMessages[i].lifeSpan >= 50) {
					floatingMessages.splice(i, 1);
					i--;
				}
			}
		};

		const handleEnemies = () => {
			for(let i = 0; i < enemies.length; i++) {
				enemies[i].update(frame);
				enemies[i].draw(ctx);
				if(enemies[i].x < 0) {
					gameOver = true;
				}
				if(enemies[i].health <= 0) {
					let gainedResources = enemies[i].maxHealth/10;
					score += gainedResources;
					let findCurrentIndex = enemyPositions.indexOf(enemies[i].y);
					enemyPositions.splice(findCurrentIndex, 1);
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
		};

		// resources

		const handleResources = () => {
			if(frame % 900 === 0 && score < winningScore) {
				resources.push(new Resource(canvas, cellSize)); // random, pt ca e fara parametri
			}
			for(let i = 0; i < resources.length; i++) {
				resources[i].draw(ctx);
				if(mouse.clicked) {
					if(resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)) {
						numberOfResources += resources[i].amount;
						resources.splice(i, 1);
						i--;
					}
				}
			}
		};

		// utilities

		let sun = new Image();
		sun.src = 'assets/sun.png';

		const handleGameStatus = () => {

			//ctx.fillStyle = 'gold';
			ctx.font = '30px Orbitron';

			ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
			ctx.lineWidth = 1;
			ctx.fillRect(580, 15, 185, 75);

			ctx.fillStyle = 'black';
			//ctx.fillText('Score: ' + score, 280, 30);
			ctx.drawImage(sun, 580, 10);
			ctx.fillText(numberOfResources, 660, 60);

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

		};

		canvas.addEventListener('click', () => {
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
			} else if(chosenDefender === 4) {
				defenderCost = 150;
			} else if(chosenDefender === 5) {
				defenderCost = 200;
			} else if(chosenDefender === 6) {
				defenderCost = 100;
			} else if(chosenDefender === 7) {
				defenderCost = 200;
			} else if(chosenDefender === 8) {
				defenderCost = 150;
			}
			if(chosenDefender > 0) {
				if(defenderCost > 0) {
					if(numberOfResources >= defenderCost) {
						defenders.push(new Defender(chosenDefender, gridPositionX, gridPositionY, cellSize, cellGap));
						numberOfResources -= defenderCost;
					} else {
						floatingMessages.push(new FloatingMessages('Need more resources', mouse.x, mouse.y, 20, 'red'));
					}
				}
				chosenDefender = 0;
			}
		});

		const background = new Image();
		background.src = "assets/bg.jpeg";
		// Make sure the image is loaded first otherwise nothing will draw.

		const background2 = new Image();
		background2.src = "assets/bg2.jpg";

		const bg = () => {

//			if(world === 10) {
				ctx.drawImage(background, 0, 0);
//			}
		};

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//ctx.fillStyle = 'blue';
			//ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
			bg();
			handleGameGrid();
			handleDefenders();
			handleResources();
			handleProjectiles();
			handleEnemies();
			handleShovel();
			chooseDefender();
			handleGameStatus();
			handleFloatingMessages();
			frame+=0.5;
			//console.log(chosenDefender);
			if(!gameOver) {
				requestAnimationFrame(animate);
			}
		};
		animate();

		window.addEventListener('resize', () => {
			canvasPosition = canvas.getBoundingClientRect();
		});

	} //END CONSTRUCTOR

}; //END CLASS

window.Game = Game; // global export


// #end js
