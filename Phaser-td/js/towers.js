var Tower = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,
	initialize: function Tower (scene){
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', towerInfo.info[towerInfo.pickedTower].parentName);
		this.nextTic = 0;
		this.name = towerInfo.info[towerInfo.pickedTower].parentName;
		this.range = towerInfo.info[towerInfo.pickedTower].range;
		this.damage = towerInfo.info[towerInfo.pickedTower].damage;
		this.speed = towerInfo.info[towerInfo.pickedTower].speed;
		this.fireRate = towerInfo.info[towerInfo.pickedTower].fireRate;
		this.gunCount = towerInfo.info[towerInfo.pickedTower].gunCount;
		this.stuntime = towerInfo.info[towerInfo.pickedTower].stuntime;
		this.aoeDistance = towerInfo.info[towerInfo.pickedTower].aoeDistance;
		this.upgradeList = towerInfo.info[towerInfo.pickedTower].upgradeList;

		this.updateCount = scene.add.text(0, 0, 0, {fontSize: '10px', fill: '#fff'});
	},
	setBulletSize: function(bullet, bulletName){
		var val;
		switch(bulletName) {
			case 'bullet':
				val = 4;
				break;
			case 'cannonball':
				val = 8;
				break;
			case 'beam':
				val = 10;
				break;
			case 'machinebullet':
				val = 4;
				break;
			case 'bulletstun':
				val = 6;
				break;
			case 'misslebullet':
				val = 10;
				break;
			default:
				val = 4;
		}
		bullet.setDisplaySize(val, val);
		bullet.height = val;
		bullet.width = val;
	},
	addBullet: function(x, y, angle, name) {
		towerInfo.currentTower = name;
		var bullet, bulletName = towerInfo.info[name].ammo;
		if(this.gunCount > 1){
			y = y + 5;
			x = x + 5;
			bullet = ammoClass.get();
			bullet.parentTower = this;
			bullet.speed = Phaser.Math.GetSpeed(this.speed, 1);
			bullet.setTexture('sprites', bulletName);
			this.setBulletSize(bullet, bulletName);
			if (bullet) {
				bullet.fire(x, y, angle);
			}
			y = y - 5;
			x = x - 5;
		}
		bullet = ammoClass.get();
		bullet.parentTower = this;
		bullet.speed = Phaser.Math.GetSpeed(this.speed, 1);

		//set bullet text for each gun needs to be done on each fire
		//if(bullet.texture.ammoName != bulletName){
			bullet.setTexture('sprites', bulletName);
		//}

		this.setBulletSize(bullet, bulletName);
		bullet.towerName = this.name;
		if (bullet) {
			bullet.fire(x, y, angle);
		}
	},
	checkEnemy: function(x, y, distance, notthisone) {
		var enemyUnits = enemies.getChildren();
		for (var i = 0; i < enemyUnits.length; i++) {
			if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance && enemyUnits[i] != notthisone){
				return enemyUnits[i];
			}
		}
		return false;
	},
	place: function(i, j, y, x) {
		this.y = i * tileSize + Math.round(tileSize / 2);
		this.x = j * tileSize + Math.round(tileSize / 2);

		//Check if offset is divisible by 32 (tileSize)
		//if not makeup for it.
		//offset moves the grid to allow placement on multiple phones

		if((xOffset % tileSize) < tileSize && xOffset != (xOffset % tileSize)){
			this.x = this.x + (xOffset % tileSize);
		}else{
			if(xOffset != 0){
				this.x = this.x - (tileSize % xOffset);
			}
		}
		if((yOffset % tileSize) < tileSize && yOffset != (yOffset % tileSize)){
			this.y = this.y + (yOffset % tileSize);
		}else{
			if(yOffset != 0){
				this.y = this.y - (tileSize % yOffset);
			}
		}
		map[y][x] = 1;
	},
	fire: function() {
		var range, enemy, angle;
		range = this.range;
		enemy = this.checkEnemy(this.x, this.y, range, 'blank');
		if (enemy) {

			//makes sure the stunned enemy is not hit twice
			//but causes towers to randomly disappear and reappear?
			// if(enemy.follower.stunned){
			//	 enemy = this.checkEnemy(this.x, this.y, range, enemy);
			// }

			angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
			this.addBullet(this.x, this.y, angle, this.name);
			this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
		}
	},
	updateTowerUpgradesNumber: function(){
		this.updateCount.x = this.x + 8;
		this.updateCount.y = this.y + 6;
		this.updateCount.text = this.upgrades || 0;
	},
	update: function(time, delta) {
		this.updateTowerUpgradesNumber();
		if (time > this.nextTic) {
			this.fire();
			this.nextTic = time + this.fireRate;
		}
	}
});
Tower.placeTower = function(pickedTower){
	towerInfo.pickedTower = pickedTower;
	var t = towers.get();
	if(t){
		t.setActive(true);
		t.setVisible(true);
		t.place(pointerRef.y, pointerRef.x, pointerRef.i, pointerRef.j);
	}
};
Tower.canPlaceTower = function(i, j){
	if(i > map.length){
		return 0;
	}
	return map[i][j] === 0;
};
Tower.isTowerPlaced = function(i, j){
	if(i > map.length){
		return 0;
	}
	return map[i][j];
};
Tower.towerMenu = function(pointer, level, gameObject){
	var i = Math.floor(pointer.y/32);
	var j = Math.floor(pointer.x/32);
	var y = Math.floor((pointer.y - yOffset)/32);
	var x = Math.floor((pointer.x - xOffset)/32);
	if(this.canPlaceTower(y, x)){
		pointerRef = {
			y: i,
			x: j,
			i: y,
			j: x
		};
		if(!game.scene.isActive('TowerMenu')){
			if(game.scene.isActive('SellUpgrade')){
				game.scene.stop('SellUpgrade');
			}
			level.scene.launch('TowerMenu');
			level.scene.moveAbove(currentLevel, 'TowerMenu');
		}
	}else{
		if(Tower.isTowerPlaced(y, x) == 1){
			pointerRef = {
				y: i,
				x: j,
				i: y,
				j: x
			};
			var towersUnits = towers.getChildren(),
				between;
			for (var i = 0; i < towersUnits.length; i++) {
				if (towersUnits[i].active){
					between = Phaser.Math.Distance.Between(pointer.x, pointer.y, towersUnits[i].x, towersUnits[i].y);
					if(between < 10){
						towerAtLocation = towersUnits[i];
					}
				}
			}
			if(towerAtLocation){
				towerXY.x = x;
				towerXY.y = y;
				level.scene.launch('SellUpgrade');
				level.scene.moveAbove(currentLevel, 'SellUpgrade');
			}
		}
	}
}

