// ImgFrameLoader.js

// globals: enemiesTypes

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

		this.miniFrame = 0;
		this.maxFrame = 15;

		this.enemy = 1;


/*
		if(enemiesTypes[0][this.frameX] == undefined) {
			enemiesTypes[0][this.frameX] = new Image();
			enemiesTypes[0][this.frameX].src = 'assets/enemies/Enemy/frames0' + (this.frameX > 9 ? this.frameX : '0' + this.frameX) + '.png';
		}
*/
/*
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
*/
	}
	update(frame){
		this.x -= this.movement;
		if(frame % 5 === 0) {
			if(this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = this.miniFrame;
			}
		}
	}
	draw(ctx){

		let frameNum = this.frameX;
		let animatedPerson = null;
		let animatedFrame = null;
		let spriteWidth = null;
		let spriteHeight = null;

		if(this.enemy == 1) {
			spriteWidth = 50;
			spriteHeight = 50;
			animatedPerson = new ImgFrameLoader('enemies', 'Enemy', 15);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		}
		if(animatedFrame) {
			ctx.drawImage(animatedFrame, 0, 0, spriteWidth, spriteHeight, this.x, this.y, this.width, this.height);

		}


		//ctx.fillStyle = 'red';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = 'black';
		ctx.font = '30px Orbitron';
		ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
		//ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
	//	ctx.drawImage(this.enemiesTypes, this.frameX /* this.spriteWidth*/, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
	}
}

// #end
