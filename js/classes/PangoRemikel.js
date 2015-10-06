var PangoRemikel = my.Class ({
	constructor: function (game) {
		this.game = game;
		this.sprite = game.add.sprite(30, mapHeight - 50, 'pangolin', 12);
		this.sprite.anchor.setTo(0.5, 0.6);
		game.physics.arcade.enable(this.sprite);
		this.sprite.immovable = true;
		this.sprite.enbaleBody = true;
		this.sprite.body.allowGravity = false;
		this.sprite.body.collideWorldBounds = true;
	},
	anim: function() {
		this.spriteAnim = this.sprite.animations.add('walk', [12, 13, 14, 15]);
		this.spriteAnim.play(3, true);
	},
	suit: function() {
		this.sprite.y = joueur.getPositionY();
	},
})