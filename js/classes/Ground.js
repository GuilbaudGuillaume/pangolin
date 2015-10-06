var Ground = my.Class ({ 
	constructor: function(game) {
		this.game = game;
		this.sprite = game.add.tileSprite(0, mapHeight -60, mapWidth, 80, "sol");
		game.physics.arcade.enable(this.sprite);
		this.sprite.enableBody = true;
		this.sprite.body.enable = true;
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;
		this.sprite.body.collideWorldBounds = true;
	},
	stage1: function () {
		this.sprite.tilePosition.x -= scroll;
	},
})