var mainMenuState = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
	function MainMenu(){
		Phaser.Scene.call(this, {key: 'MainMenu'});
	},
	preload: function() {},
	createText: function(x, y, string, style){
		var text = this.add.text(x, y, string, style);
			text.setOrigin(0.5, 0.5);
			text.setInteractive();
	},
	create: function() {
		var x, y, offsetTop, style;
		x = screen.width / 2;
		y = screen.height / 2;
		offsetTop = 60,
		style = {
			fontSize: '15px',
			fill: '#fff'
		};

		//intro text
		this.createText(x, y - offsetTop, 'Tower Defense', {fontSize: '20px', fill: '#fff'});
		this.createText(x, (y + 20) - offsetTop, 'Created by: Ilies Victor', {fontSize: '10px', fill: '#fff'});

		//bordered buttons
		borderButton(this, x, (y + 60) - offsetTop, 'Level Select', style, mainMenuState.levelSelect, true);
		borderButton(this, x, (y + 100) - offsetTop, 'Start Game', style, mainMenuState.startLevel, true);
		borderButton(this, x, (y + 140) - offsetTop, 'Quit', style, mainMenuState.quit, true);
	},
	update: function() {}
});

mainMenuState.levelSelect = function(){
	game.scene.stop('MainMenu');
	game.scene.start('LevelSelect');
};
mainMenuState.startLevel = function(){
	game.scene.start('Level1');
	game.scene.stop('MainMenu');
	currentLevel = 'Level1';
	levelPlaying = true;
};
mainMenuState.quit = function(){
	helpers.quitGame();
};

towerD.scenes.push(mainMenuState);
