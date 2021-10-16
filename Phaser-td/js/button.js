var borderButton = function(scene, x, y, text, style, callback, outline){
	var text = scene.add.text(x, y, text, style);
		text.setOrigin(0.5, 0.5);
		text.setInteractive();
		if (callback) {
			text.on('pointerup', callback);
		}
		if (outline) {
			borderButton.createOutline(scene, x, y, text.width, text.height);
		}
};
borderButton.createOutline = function(scene, x, y, width, height){
	var graphics, padding;
		graphics = scene.add.graphics(),
		padding = 15;
		width = 150;
		x = x - width / 2 - (padding / 2) - 1;
		y = y - height / 2 - padding / 2;
		width = width + padding;
		height = height + padding;
		graphics.lineStyle(1, 0xffffff, 1);
		graphics.strokeRoundedRect(x, y, width, height, 5);
		graphics.fillStyle(0xffff00, 1);
};
