var towerD = {
		scenes: [],
	},
	//emitters
	deathEmitter,
	aoeEmitter,
	path,
	enemies,
	towers,
	levelCount = 9,
	levelPlaying = false,
	levelPaused = false,
	levelReference,
	tileSize = 32,
	gridWidth = 320,
	gridHeight = 512,
	xOffset = Math.round(screen.width / 2 - gridWidth / 2),
	yOffset = (screen.width === 320) ? 32 : 64,
	currentLevel,
	levelsCompleted = 1,

	//location of tower for sell and upgrades
	towerAtLocation,
	towerXY = {},

	//reference for tower selection
	pointerRef = {},
	ammoClass,

	//level info
	map = [],
	mapPath = [],
	enemyWave = {},
	enemyPath = {},
	ammo = {},
	money = {},
	towerCost = {},

	//level creators/manager
	helpers = {
		currentWaveNumber: function(){
			return enemyWave.currentWave + 1;
		},
		currentEnemy: function(){
			return enemyWave.waves[enemyWave.currentWave][enemyWave.count];
		},
		enemyCount: function(){
			return enemyWave.waves[enemyWave.currentWave].enemyCount;
		},
		waveCount: function(){
			return enemyWave.waves.length;
		},
		nextWaveTime: function(){
			return enemyWave.waves[enemyWave.currentWave].startTime;
		},
		quitGame: function(){
			location.href = "js-call:loadLPPMain";
		}
	},
	levelManager = {
		createRotationAngles: function(obj){
			Object.keys(obj).forEach(function(key, index) {
				if(index-1 >= 0){
					var p1 = obj['N' + Number(index-1)];
					var p2 = obj['N' + index];
					if(p1){
					//console.log(p1);
					//console.log(p2);
					obj['N' + Number(index-1)].angle = Math.atan2(p2.Y - p1.Y, p2.X - p1.X) * 180 / Math.PI;
					}
				}
			});
			enemyPath = obj;
			//console.log(obj);
		},
		createPathObject: function() {
			var pathObject = {},
				tile, lineV, row;
			for (var m = 0; m < mapPath.length; m++) {
				for (var n = 0; n < mapPath[m].length; n++) {
					tile = mapPath[m][n];
					lineV = (m + 1) * tileSize;
					row = (n + 1) * tileSize;
					if (tile) {
						pathObject['N' + tile] = {
							X: row,
							Y: lineV
						}
					}
				}
			}
			this.createRotationAngles(pathObject);
			return pathObject;
		},
		drawStartPoint: function(x, y, level){
			var rect = new Phaser.Geom.Rectangle(x-tileSize, y-tileSize, 4, 32);
			if(x-tileSize >= tileSize){
				rect.width = 32;
				rect.height = 4;
			}
			var graphics = level.add.graphics({ fillStyle: { color: 0xff0000 } });
			graphics.fillRectShape(rect);
			graphics.x = xOffset;
			graphics.y = yOffset;
		},
		drawEndPoint: function(x, y, level){
			var rect = new Phaser.Geom.Rectangle(x-tileSize, y-tileSize, 32, 4);
			if(y-tileSize >= (map.length * tileSize) - tileSize){
				rect.y = (map.length * tileSize) - rect.height;
			}

			//if end point is not at the top or bottom (in the middle flip)
			if(y > 32 && y < (map.length * tileSize)){
				rect.width = 4;
				rect.height = 32;
			}

			//if end is equal to grid width remove the - tilesize and just set rect
			if(x === gridWidth){
				rect.x = gridWidth;
			}

			var graphics = level.add.graphics({ fillStyle: { color: 0x0000ff } });
			graphics.fillRectShape(rect);
			graphics.x = xOffset;
			graphics.y = yOffset;
		},
		drawEnemyPath: function(level, graphics) {
			var pathObject = this.createPathObject(),
				objIndex, x, y, oldX, oldY;
			Object.keys(pathObject).forEach(function(key, index) {
				objIndex = Number(index + 1);
				if (index === 0) {
					levelManager.drawStartPoint(pathObject['N' + objIndex].X, pathObject['N' + objIndex].Y, level);
					//if almost to the edge on X move it to the edge
					if(pathObject['N' + objIndex].X === tileSize){
						pathObject['N' + objIndex].X = tileSize - tileSize/2;
					}

					if(pathObject['N' + objIndex].Y === tileSize){
						pathObject['N' + objIndex].Y = tileSize - (tileSize / 2);
					}

					path = level.add.path(pathObject['N' + objIndex].X - tileSize / 2 + xOffset, pathObject['N' + objIndex].Y - tileSize / 2 + yOffset);
				}

				x = pathObject['N' + objIndex].X - tileSize / 2;
				y = pathObject['N' + objIndex].Y - tileSize / 2;

				//if last tile and y  move it to top of screen
				if(objIndex === Object.keys(pathObject).length){

					if(pathObject['N' + objIndex].Y === tileSize){
						y = pathObject['N' + objIndex].Y - tileSize;
					}

					if(pathObject['N' + objIndex].Y === gridHeight){
						y = 512;
					}

					//if x is equal to width then don't subtract the - tilesize
					if(pathObject['N' + objIndex].X === gridWidth){
						x = pathObject['N' + objIndex].X;
					}

					levelManager.drawEndPoint(pathObject['N' + objIndex].X, pathObject['N' + objIndex].Y, level);
				}
				path.lineTo(x + xOffset, y + yOffset);
			});
			//width, color, alpha
			graphics.lineStyle(1, 0xffffff, 0.5);
			path.draw(graphics);
			// graphics.x = 40;
			// graphics.y = 100;
		},
		drawGridLines: function(level) {
			var graphic = level.add.graphics();
			graphic.lineStyle(1, 0xffffff, 0.2);// 0.1
				//horizontal
				for (var i = 0; i < map.length; i++) {
					graphic.moveTo(0, i * tileSize);
					graphic.lineTo(gridWidth, i * tileSize);
					if(i + 1 === map.length){
						graphic.moveTo(0, gridHeight);
						graphic.lineTo(gridWidth, gridHeight);
					}
				}
				//vertical
				for (var j = 0; j < map[0].length; j++) {
					graphic.moveTo(j * tileSize, 0);
					graphic.lineTo(j * tileSize, gridHeight);
					if(j + 1 === map[0].length){
						graphic.moveTo(gridWidth, 0);
						graphic.lineTo(gridWidth, gridHeight);
					}
				}
				graphic.strokePath();
				graphic.x = xOffset;
				graphic.y = yOffset;
		},
		createPathAndGrid: function(level) {
			var graphics = level.add.graphics();
			this.drawGridLines(level);
			this.drawEnemyPath(level, graphics);
		},
		createDisplayItems: function(level) {
			level.waveDisplay = level.add.text(Math.round(screen.width/2), yOffset-10, "Wave: 1", { fontSize: '14px', fill: '#fff' });
			level.waveDisplay.setOrigin(0.5, 1);

			level.moneyDisplay = level.add.text(screen.width - xOffset, yOffset-10, "Money: $" + money.amount, { fontSize: '14px', fill: '#fff' });
			level.moneyDisplay.setOrigin(1,1);


			level.healthDisplay = level.add.text(xOffset, yOffset-10, "Health: " + money.health, { fontSize: '14px', fill: '#fff' });
			level.healthDisplay.setOrigin(0,1);


			level.nextWave = level.add.text(screen.width - xOffset, gridHeight + yOffset + 25, "Next Wave", { fontSize: '14px', fill: '#fff' });
			level.nextWave.setOrigin(1,1);

			level.pauseButton = level.add.text(xOffset, gridHeight + yOffset + 25, "Pause", { fontSize: '14px', fill: '#fff' });
			level.pauseButton.setOrigin(0,1);
			level.pauseButton.setInteractive();
			level.pauseButton.on('pointerup', function(pointer){
				if(!levelPaused){
					levelPaused = true;
					level.scene.pause();
					game.scene.start('PauseMenu');
					level.scene.moveAbove(currentLevel, 'PauseMenu');
				}
			}, level);

			level.nextWave.visible = false;
			level.nextWave.setInteractive();
			level.nextWave.on('pointerup', function(pointer) {
				level.nextWave.visible = false;
				level.nextEnemy = 0;
				money.amount = money.amount + money.amountOnNextWave;
			}, level);
		},
		enemyDiedAnimation: function(x, y, name){
			if(!deathEmitter){
				deathEmitter = levelReference.add.particles('sprites', name).createEmitter({
					x: 0,
					y: 0,
					speed: { min: -100, max: 100 },
					angle: { min: 0, max: 360 },
					scale: { start: 0.1, end: 0 },
					blendMode: 'SCREEN',
					lifespan: 1000,
					gravityY: 0
				});
			}
			deathEmitter.on = true;
			deathEmitter.setPosition(x, y);

			levelReference.time.addEvent({
				delay: 300,
				callback: function(){
					deathEmitter.on = false
				},
				callbackScope: levelReference
			});
		},
		createGroupsAndPhysics: function(level) {
			enemies = level.physics.add.group({
				classType: Enemy,
				runChildUpdate: true
			});
			ammoClass = level.physics.add.group({
				classType: Ammo,
				runChildUpdate: true
			});
			towers = level.add.group({
				classType: Tower,
				runChildUpdate: true
			});
			level.physics.add.overlap(enemies, ammoClass, Enemy.damageEnemy);
		},
		createListeners: function(level) {
			level.input.on('pointerdown', function(pointer, gameObject) {
				if (!gameObject[0]) {
					if (!game.scene.isActive('TowerMenu')) {
						Tower.towerMenu(pointer, level);
					}
				}
			});
		},
		create: function(level) {
			level.nextEnemy = 0;
			levelReference = level;
			this.createPathAndGrid(level);
			this.createGroupsAndPhysics(level);
			this.createDisplayItems(level);
			this.createListeners(level);
			this.drawGridLines(level);
		},
		addEnemyHeathbar: function(level, enemy){
			enemy.healthbar = level.add.text(0, 0, "22", { fontSize: '7px', fill: '#fff'});
			enemy.healthbar.setOrigin(0,0);
			enemy.healthbar.setShadow(3, 3, 'rgba(0,0,0,1)', 5);
			// var rect = new Phaser.Geom.Rectangle(0, 0, 20, 2);
			// enemy.healthbar = level.add.graphics({ fillStyle: { color: 0x032CD32 } });
			// enemy.healthbar.fillRectShape(rect);
			// enemy.healthbar.shape = rect;
			// enemy.healthbar.maxHealth = enemy.hp;
		},
		newEnemy: function(level, time) {
			var enemy = enemies.get();
			if (enemy) {
				this.addEnemyHeathbar(level, enemy);
				enemy.setActive(true);
				enemy.setVisible(true);
				enemy.startOnPath();
				level.nextEnemy = time + helpers.currentEnemy().spawnSpeed;
				console.log(helpers.currentEnemy().spawnSpeed);
			}
		},
		updateEnemyCounts: function(level) {
			level.waveDisplay.text = "Wave: " + helpers.currentWaveNumber();
			enemyWave.count++;
			level.nextWave.visible = false;
		},
		anyEnemiesLeft: function() {
			if(!levelPlaying){
				return;
			}
			var active = false;
			for (var i = 0; i < enemies.getChildren().length; i++) {
				if (enemies.getChildren()[i].active) {
					active = true;
				}
			}
			return active;
		},
		levelComplete: function(level) {
			level.nextWave.visible = false;
			game.scene.remove(currentLevel);
			game.scene.start('LevelComplete');
		},
		startNextWave: function(level, time) {
			enemyWave.count = 0;
			enemyWave.currentWave = enemyWave.currentWave + 1;
			level.nextEnemy = time + helpers.nextWaveTime();
		},
		update: function(time, delta, level) {
			level.moneyDisplay.text = "Cash: $" + money.amount;
			level.healthDisplay.text = "Health: " + money.health;
			if (time > level.nextEnemy && enemyWave.count < helpers.enemyCount()) {
				this.newEnemy(level, time);
				this.updateEnemyCounts(level);
			} else {
				if (!this.anyEnemiesLeft()) {
					if (enemyWave.count >= helpers.enemyCount()) {
						level.nextWave.visible = true;
					}
					if (enemyWave.currentWave + 1 >= enemyWave.allWaves && time > level.nextEnemy) {
						this.levelComplete(level);
					}
					if (enemyWave.count >= helpers.enemyCount() && time > level.nextEnemy && helpers.currentWaveNumber() < enemyWave.allWaves) {
						this.startNextWave(level, time);
					}
				}
			}
		}
	};

