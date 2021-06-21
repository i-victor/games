// ImgFrameLoader.js

//(c) 2021 github.com/i-victor

//console.log('ImgFrameLoader.js loaded ok');

const ImgFrameLoader = class {

	constructor(type, name, maxFrame) {

		this.initialized = false;

		this.type = String(type);

		this.name = String(name);

		this.maxFrame = Math.floor(maxFrame);
		if(this.maxFrame <= 1) {
			this.maxFrame = 1;
		}

		this.frames = [];

	} //END FUNCTION

	getImageFrame(frameNumber) {

		frameNumber = Math.floor(frameNumber % this.maxFrame);
		if(frameNumber <= 1) {
			frameNumber = 1;
		}
		if(frameNumber > this.maxFrame) {
			frameNumber = 1;
		}

		if(this.initialized !== true) {
			for(var i=0; i<this.maxFrame; i++) {
				if(this.frames[i] == undefined) {
					this.frames[i] = new Image();
					this.frames[i].src = 'assets/' + this.type + '/' + this.name + '/frames0' + (i > 9 ? i : '0' + i) + '.png';
				}
			}
			this.initialized = true;
		}

		if(frameNumber >= 0) {
			if(this.frames[frameNumber] == undefined) {
				this.frames[frameNumber] = new Image();
				this.frames[frameNumber].src = 'assets/' + this.type + '/' + this.name + '/frames0' + (frameNumber > 9 ? frameNumber : '0' + frameNumber) + '.png';
			}
			return this.frames[frameNumber];
		}
		return null;

	} //END FUNCTION

}; //END CLASS

// #end js
