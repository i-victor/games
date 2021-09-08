// Projectile.js

//(c) 2021 github.com/i-victor

//console.log('Projectile.js loaded ok');

const Projectile = class {

	constructor(chosenBullet, x, y) {
		this.chosenBullet = chosenBullet;
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
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
		} else if(this.chosenBullet == 5) {
			this.power = 30;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet6.gif';
		} else if(this.chosenBullet == 6) {
			this.power = 45;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet7.png';
		} else if(this.chosenBullet == 7) {
			this.power = 45;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet8.png';
		} else if(this.chosenBullet == 8) {
			this.power = 45;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet11.png';
		} else if(this.chosenBullet == 9) {
			this.power = 45;
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet10.png';
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
