var config = {
	type: Phaser.AUTO,
	parent: 'content',
	width: screen.width,
	height: screen.height,
	audio: {
		noAudio: true
	},
	resolution: window.devicePixelRatio,
	pixelAt: true,
	physics: {
		default: 'arcade',
		arcade:{
			debug: false
		}
	},
	scene: towerD.scenes
},
game = new Phaser.Game(config);
game.scene.start('Preload');
