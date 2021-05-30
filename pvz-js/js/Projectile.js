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

		this.bullet1 = new Image();
		this.bullet1.src = 'assets/Bullet.png';

		this.bullet2 = new Image();
		this.bullet2.src = 'assets/Bullet2.png';

	}

	update(){
		this.x += this.speed;
	}

	draw(ctx){
		if(this.chosenBullet == 1) {
			ctx.drawImage(this.bullet1, this.x, this.y - 40, 25, 24);
		} else if(this.chosenBullet == 2) {
			ctx.drawImage(this.bullet2, this.x, this.y - 40, 25, 24);
		}
	}
}

// #end js
