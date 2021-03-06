// Character.js

//(c) 2021 github.com/i-victor

// depends on: ImgFrameLoader

//console.log('Character.js loaded ok');

const Character = class {

	constructor(ctx, chosenDefender, shooting, shootNow, frameNum, x, y, width, height, speed) {

		let animatedPerson = null;
		let animatedFrame = null;
		let spriteWidth = null;
		let spriteHeight = null;
		this.speed = speed;

		frameNum = Math.ceil(frameNum / this.speed);

		if(chosenDefender === 1) {
		//	if(shooting) {
		//		frameNum = 10;
		//	}
			spriteWidth = 71;
			spriteHeight = 71;
			animatedPerson = new ImgFrameLoader('characters', 'PeaShooter2', 25);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 2) {
		//	if(shooting) {
		//		frameNum = 8;
		//	}
			spriteWidth = 200;
			spriteHeight = 195;
			animatedPerson = new ImgFrameLoader('characters', 'Cactus2', 15);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 3) {
			spriteWidth = 74;
			spriteHeight = 73;
			animatedPerson = new ImgFrameLoader('characters', 'SunFlower', 15);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 4) {
			spriteWidth = 77;
			spriteHeight = 70;
			animatedPerson = new ImgFrameLoader('characters', 'StarFruit', 17);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 5) {
			spriteWidth = 40;
			spriteHeight = 66;
			animatedPerson = new ImgFrameLoader('characters', 'SeaShroom', 10);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 6) {
			spriteWidth = 130;
			spriteHeight = 114;
			animatedPerson = new ImgFrameLoader('characters', 'LotusRoot', 30);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 7) {
			spriteWidth = 84;
			spriteHeight = 87;
			animatedPerson = new ImgFrameLoader('characters', 'Plantern', 19);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 8) {
			spriteWidth = 112;
			spriteHeight = 81;
			animatedPerson = new ImgFrameLoader('characters', 'GloomShroom', 18);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 9) {
			spriteWidth = 49;
			spriteHeight = 49;
			animatedPerson = new ImgFrameLoader('characters', 'HeadButter', 76);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		} else if(chosenDefender === 10) {
			spriteWidth = 100;
			spriteHeight = 100;
			animatedPerson = new ImgFrameLoader('characters', 'ShadowShooter', 6);
			animatedFrame = animatedPerson.getImageFrame(frameNum);
		}

		if(animatedFrame) {
			ctx.drawImage(animatedFrame, 0, 0, spriteWidth, spriteHeight, x, y, width, height);
		}

	} //end constructor

}; //END CLASS

// #end js
