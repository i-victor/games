var Enemy = new Phaser.Class({
	Extends: Phaser.GameObjects.Sprite,
	createHealthBar: function(scene){
		// var rect = new Phaser.Geom.Rectangle(0, 0, 20, 5);
		// this.health = scene.add.graphics({ fillStyle: { color: 0x0000ff } });
		// this.health.fillRectShape(rect);
		// this.health.shape = rect;
	},
	initialize: function Enemy(scene) {
		var enemyInfo = helpers.currentEnemy();
		Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'sprites', enemyInfo.name);
		this.setDisplaySize(20, 20);
		this.height = 20;
		this.width = 20;
		this.follower = {
			t: 0,
			speed: 0,
			vec: new Phaser.Math.Vector2()
		};
		this.hp = enemyInfo.hp;
		this.name = enemyInfo.name;
		this.pays = enemyInfo.pays;
		this.takesHealth = enemyInfo.takesHealth;

		//this.createHealthBar(scene);
	},
	startOnPath: function() {
		this.follower.t = 0;
		this.follower.speed = helpers.currentEnemy().movementSpeed;
		this.hp = helpers.currentEnemy().hp;
		path.getPoint(this.follower.t, this.follower.vec);
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
	},
	aoeAnimation: function(x, y, name){
		if(!aoeEmitter){
			aoeEmitter = levelReference.add.particles('sprites', 'bullet').createEmitter({
				x: 0,
				y: 0,
				speed: { min: 0, max: 0 },
				angle: { min: 0, max: 360 },
				scale: { start: 0, end: 15 },
				blendMode: 'SCREEN',
				lifespan: 400,
				alpha: 0.02,
				gravityY: 0
			});
		}
		aoeEmitter.on = true;
		aoeEmitter.setPosition(x, y);

		levelReference.time.addEvent({
			delay: 300,
			callback: function(){
				aoeEmitter.on = false
			},
			callbackScope: levelReference
		});
	},
	aoeDamage: function(enemy, projectile, damage){
			var enX = enemy.x;
			var enY = enemy.y;
			var distance = projectile.parentTower.aoeDistance;
			var enemyUnits = enemies.getChildren();
			this.aoeAnimation(enX, enY);
			for (var i = 0; i < enemyUnits.length; i++) {
				if (enemyUnits[i].active && Phaser.Math.Distance.Between(enX, enY, enemyUnits[i].x, enemyUnits[i].y) < distance && enemyUnits[i] != enemy){
					enemyUnits[i].hp -= damage;
					if(enemyUnits[i].hp <= 0){
						enemyUnits[i].healthbar.setActive(false);
						enemyUnits[i].healthbar.setVisible(false);
						money.amount = money.amount + enemyUnits[i].pays;
						enemyUnits[i].setActive(false);
						enemyUnits[i].setVisible(false);
						levelManager.enemyDiedAnimation(enemyUnits[i].x, enemyUnits[i].y, enemyUnits[i].name);
					}
				}
			}
	},
	receiveDamage: function(enemy, projectile) {
		var damage = projectile.parentTower.damage,
			towerName = projectile.towerName;

		if(towerName === 'stun'){
			this.follower.stunned = true;
			this.follower.releaseTime = projectile.parentTower.stuntime + Date.now();
		}else if (towerName === 'missle'){
			this.aoeDamage(enemy, projectile, damage);
		}

		this.hp -= damage;

		if (this.hp <= 0) {
			this.healthbar.setActive(false);
			this.healthbar.setVisible(false);
			money.amount = money.amount + enemy.pays;
			this.setActive(false);
			this.setVisible(false);
			levelManager.enemyDiedAnimation(this.x, this.y, this.name);
		}
	},
	rotateEnemy:function(angle){
		if(angle == 0){
			this.angle = 90;
		}else if (angle == 90){
			this.angle = -180;
		}else if (angle === 180){
			this.angle = -90;
		}else if (angle === -90){
			this.angle = 360;
		}else{
			this.angle = -180;
		}
	},
	update: function(time, delta) {
		this.healthbar.text = this.hp;
		if(this.follower.stunned){
			if(Date.now() >= this.follower.releaseTime){
				this.follower.stunned = false;
			}else{
				return;
			}
		}
		this.follower.t += this.follower.speed * delta;

		var point = path.getPoint(this.follower.t, this.follower.vec);
		this.setPosition(this.follower.vec.x, this.follower.vec.y);
		this.healthbar.x = Math.floor(this.follower.vec.x - this.healthbar.width/2);
		this.healthbar.y = Math.floor(this.follower.vec.y - this.height);


		var flx = Math.round(Math.floor(this.follower.vec.x) - xOffset - tileSize / 2);
		var fly = Math.round(Math.floor(this.follower.vec.y) - yOffset - tileSize / 2);
		Object.keys(enemyPath).forEach(function(key, index) {
			if(Number(flx + 33) === enemyPath[key].X && Number(fly + 32) === enemyPath[key].Y){
				this.rotateEnemy(enemyPath[key].angle);
			}
			if(Number(flx + 31) === enemyPath[key].X && Number(fly + 32) === enemyPath[key].Y){
				this.rotateEnemy(enemyPath[key].angle);
			}
			if(Number(flx + 32) === enemyPath[key].X && Number(fly + 32) === enemyPath[key].Y){
				this.rotateEnemy(enemyPath[key].angle);
			}
		}, this);

		if (this.follower.t >= 1) {
			money.health = money.health - this.takesHealth;
			if(money.health <= 0){
				game.scene.stop(currentLevel);
				game.scene.start('GameOver');
				levelPlaying = false;
			}
			this.healthbar.setActive(false);
			this.healthbar.setVisible(false);
			this.setActive(false);
			this.setVisible(false);
		}
	}
});

Enemy.damageEnemy = function(enemy, projectile){
	if (enemy.active === true && projectile.active === true) {

		//laser pierces so let bullet live when enemy is hit
		if(projectile.towerName != 'laser'){
			projectile.setActive(false);
			projectile.setVisible(false);
		}
		enemy.receiveDamage(enemy, projectile);
	}
};
