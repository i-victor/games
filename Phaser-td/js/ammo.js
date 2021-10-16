var Ammo = new Phaser.Class({
	Extends: Phaser.GameObjects.Image,
	initialize: function Ammo(scene) {
		var bulletInfo = towerInfo.info[towerInfo.currentTower];
		Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', bulletInfo.ammo);
		this.texture.ammoName = bulletInfo.ammo;
		this.setDisplaySize(4, 4);
		this.height = 4;
		this.width = 4;

		this.incX = 0;
		this.incY = 0;
		this.lifespan = 0;
		this.name = towerInfo.info[towerInfo.currentTower].ammo;
		//console.log(this.name);
		this.parentName = towerInfo.info[towerInfo.currentTower].parentName;
		this.speed = Phaser.Math.GetSpeed(bulletInfo.speed, 1);
	},
	fire: function(x, y, angle) {
		this.setActive(true);
		this.setVisible(true);
		//  Bullets fire from the middle of the screen to the given x/y
		this.setPosition(x, y);

		//this.loadTexture('beam');
		//console.log(this.texture);
		if (this.name = 'beam'){
			this.setRotation(angle);
		}
		//	this.setRotation(angle);

		this.dx = Math.cos(angle);
		this.dy = Math.sin(angle);
		this.lifespan = towerInfo.info[towerInfo.currentTower].lifespan;
	},
	update: function(time, delta) {
		this.lifespan -= delta;

		this.x += this.dx * (this.speed * delta);
		this.y += this.dy * (this.speed * delta);

		if (this.lifespan <= 0) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
});
