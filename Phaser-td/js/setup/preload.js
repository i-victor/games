var preloadState = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function Preload(){
		Phaser.Scene.call(this, {key: 'Preload'});
	},
	preload: function() {
		this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
		storageInfo.loadLevels();
		this.load.svg('map', 'assets/maps/map.svg');
		this.load.svg('map2', 'assets/maps/map2.svg');
	},
	create: function() {
		game.scene.start('MainMenu');
	},
	update: function() {

	}
});

towerD.scenes.push(preloadState);
