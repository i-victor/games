var GameOver = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:function MainMenu(){
		Phaser.Scene.call(this, {key: 'GameOver'});
	},
	preload: function() {},
	create: function() {
		var x, y, offsetTop, style;
		x = screen.width / 2;
		y = screen.height / 2;
		offsetTop = 60,
		style = {
			fontSize: '15px',
			fill: '#22C71D'
		};

		borderButton(this, x, y - offsetTop, 'Restart Level', style, GameOver.restartLevel, true);
		borderButton(this, x, (y + 40) - offsetTop, 'Level Select', style, GameOver.levelSelect, true);
		borderButton(this, x, (y + 80) - offsetTop, 'Exit', style, mainMenuState.quit, true);
	},
	update: function() {}
});

GameOver.restartLevel = function(){
	deathEmitter = null;
	game.scene.start(currentLevel);
	game.scene.stop('GameOver');
	levelPlaying = true;
};

GameOver.levelSelect = function(){
	game.scene.stop('GameOver');
	game.scene.start('LevelSelect');
};

towerD.scenes.push(GameOver);
