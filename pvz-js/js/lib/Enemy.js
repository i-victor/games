// Enemy.js

//(c) 2021 github.com/i-victor

// globals: enemiesTypes

//console.log('Enemy.js loaded ok');

const Enemy = class {

	constructor(x, y, cellSize, cellGap) {

		this.x = x;
		this.y = y;

		this.width = cellSize - cellGap * 2;
		this.height = cellSize - cellGap * 2;

		this.speed = Math.random() * 0.2 + 0.4;
		this.movement = this.speed;

		this.health = 100;
		this.maxHealth = this.health;

		this.miniFrame = 0;
		this.maxFrame = 1;

		this.enemy = Math.ceil(Math.random() * 10 / 4);
		if(this.enemy < 1) {
			this.enemy = 1;
		} else if(this.enemy > 3) {
			this.enemy = 3;
		}

		this.frameNum = 0;

	}

	draw(ctx) {

		let animatedPerson = null;
		let animatedFrame = null;
		let spriteWidth = null;
		let spriteHeight = null;
		let enemyName = null;

		switch(this.enemy) {
			case 3:
				spriteWidth = 106;
				spriteHeight = 126;
				enemyName = 'Enemy4';
				this.maxFrame = 3;
				break;
			case 2:
				spriteWidth = 98;
				spriteHeight = 98;
				enemyName = 'Enemy2';
				this.maxFrame = 51;
				break;
			case 1:
			default:
				spriteWidth = 50;
				spriteHeight = 50;
				enemyName = 'Enemy';
				this.maxFrame = 16;
		}
		if(!enemyName) {
			return;
		}

		animatedPerson = new ImgFrameLoader('enemies', enemyName, this.maxFrame);
		animatedFrame = animatedPerson.getImageFrame(this.frameNum);
//console.log(animatedFrame);

		if(animatedFrame) {
			ctx.drawImage(animatedFrame, 0, 0, spriteWidth, spriteHeight, this.x, this.y, this.width, this.height);

		}
		ctx.fillStyle = 'black';
		ctx.font = '30px Orbitron';
		//ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);

	}

	update(frame) {
		this.x -= this.movement;
		if(frame % 5 === 0) {
			if(this.frameNum < this.maxFrame) {
				this.frameNum++;
			} else {
				this.frameNum = this.miniFrame;
			}
		}
	}

};

// #end
