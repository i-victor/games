// Projectile.js

class Projectile {

	constructor(chosenBullet, x, y){
		this.chosenBullet = chosenBullet;
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = 20;
		this.speed = 5;

		this.bullet = null;
		if(this.chosenBullet == 1) {
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet.png';
		} else if(this.chosenBullet == 2) {
			this.bullet = new Image();
			this.bullet.src = 'assets/Bullet2.png';
		}

	}

	update(){
		this.x += this.speed;
	}

	draw(ctx){
		if(this.bullet) {
			ctx.drawImage(this.bullet, this.x, this.y - 40, 25, 24);
		}
	}
}

// #end js
