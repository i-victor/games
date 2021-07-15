// Projectile.js

//(c) 2021 github.com/i-victor

//console.log('Projectile.js loaded ok');

const Projectile = class {

	constructor(chosenBullet, x, y) {
		this.chosenBullet = chosenBullet;
		this.x = x;
		this.y = y;
		this.width = 120;
		this.height = 120;
		this.power = 20;
		this.speed = 5;

		this.bullet = null;
		if(this.chosenBullet == 1) {
			this.power = 20;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet.png';
		} else if(this.chosenBullet == 2) {
			this.power = 25;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet2.png';
		} else if(this.chosenBullet == 3) {
			this.power = 35;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet3.png';
		} else if(this.chosenBullet == 4) {
			this.power = 45;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet5.gif';
		}

	}

	update() {
		this.x += this.speed;
	}

	draw(ctx) {
		if(this.bullet) {
//alert('a');
//console.log(this.bullet);
			ctx.drawImage(this.bullet, this.x, this.y - 40, 25, 24);
		}
	}
};

// #end js
