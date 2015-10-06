var Hamburger = my.Class ({
	constructor: function (game) {
		this.game = game;
		this.sprite = this.game.add.sprite(250, 500, "personnage");
		this.sprite.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.enableBody = true;
		this.sprite.body.enable = true;
		this.sprite.body.collideWorldBounds = true;
    	this.sprite.body.bounce.y = 0.8;
    	this.sprite.body.gravity.y = 800;
    	this.sprite.jump = true;

	},

	aniJoueur: function(){
		if(countFrame < 30) {
			countFrame++;
		} else {
			if ((countFrame == 30) && (this.sprite.angle >= 0)) {
				this.sprite.angle = -30;
				countFrame = 0;
			} else {
				this.sprite.angle = 30;
				countFrame = 0;
			}
		}
	},
	getEtatJump: function() {
		return this.sprite.jump;
	},
	setJump: function(jump) {
		this.sprite.jump = jump;
	},
	getPositionY: function() {
		return this.sprite.y;
	},
	moveLeft: function() {
		this.sprite.x -= 10;
	},
	moveRight: function() {
		this.sprite.x += 10;
	},
	moveTop: function(saut, jump) {
		if(saut === 2 && jump === true) {
			this.sprite.y -= 70;
			this.sprite.jump = false;
			console.log('petit saut');
		}
		 else if (saut === 1) {
			this.sprite.y -= 150;
			this.sprite.jump = true;
			console.log('grand saut');
		}

	},
	moveBottom: function() {
		this.sprite.y += 20;
	},
})