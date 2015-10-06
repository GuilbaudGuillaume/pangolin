var WIDTH = 40;
var HEIGHT = 40;
var mapWidth = WIDTH * 33;
var mapHeight = HEIGHT * 20;
var joueur;
var ground;
var joueur;
var pangolinRemikel;
var pangoRemikel;
var player;
var countFrame = 0;
var etatJump;
var cursors;
var scroll = 3;
var sol;
var RIGHT = true;
var background;
var obstacle;
var chaise;
var bureau;
var positionY2;
var jump;
var animPangolin;
var backgroundB;
var suit;
var back;
var positionY = false;
var game = new Phaser.Game(mapWidth, mapHeight, Phaser.AUTO, "content", {preload:preload, create:create, update:update, render: function () { /*game.debug.body(chaise, 32, 32);
game.debug.body(joueur.sprite, 50, 50); game.debug.body(pangolinRemikel, 32, 32); game.debug.bodyInfo(pangolinRemikel, 24, 24);*/} });
game.transparent = false;

function preload() {
	game.load.image('background', 'js/tilset/background.jpeg');
	game.load.spritesheet("personnage", "js/sprite/personnage.png", 80, 100, 7);
	game.load.spritesheet('sol', 'js/tilset/sol.png', 40, 40, 4);
	game.load.spritesheet('pangolin', 'js/sprite/zombie.png', 128, 128, 16);
	game.load.image('chaise', 'js/obstacle/fauteuil.png');
	game.load.image('bureau', 'js/obstacle/bureau.png');
}
function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	back = game.add.sprite(0, 0, 'background');
	back.width = mapWidth;
	back.height = mapHeight;
	
	//game.physics.arcade.gravity.y = 250;
	//sol = game.add.group();
	//sol.enableBody = true;
	background = new Ground(game);
	game.enableBody = true;
	//sol.scale.to(2, 2);
	//ground.body.immovable = true;
	joueur = new Hamburger(game);
	game.physics.arcade.gravity.y = 250;
	game.physics.arcade.collide(joueur, background);
	cursors = game.input.keyboard.createCursorKeys();
	pangolinRemikel = new PangoRemikel(game);
	pangolinRemikel.anim();

	obstacle = game.add.group();
	//game.physics.arcade.enable();
	obstacle.enableBody = true;

	chaise = obstacle.create(mapWidth, mapHeight - 150, "chaise");
	chaise.scale.x = 0.1;
	chaise.scale.y = 0.1;
	game.physics.arcade.enable(chaise);	
	chaise.enableBody = true;
	chaise.body.immovable = true;
	chaise.body.collideWorldBounds = true;
	chaise.body.allowGravity= false;


	//game.physics.enable([joueur, pangolinRemikel, background, chaise], Phaser.Physics.ARCADE);
	//animPangolin = pangolinRemikel.animations.add('walk', [12, 13, 14, 15]);
	/*animPangolin.onStart.add(animationStarted, this);
	animPangolin.onLoop.add(animationLooped, this);
    animPangolin.onComplete.add(animationStopped, this);*/
    //animPangolin.play(3, true);
	//joueur.game.body.collideWorldBounds = true;
}
function update() {
	game.physics.arcade.collide(joueur.sprite, chaise, stopPlayer, null, this);
	game.physics.arcade.overlap(joueur.sprite, chaise, stopPlayer, null, this);
	if (game.physics.arcade.overlap(joueur.sprite, chaise, stopPlayer) === false) {
		RIGHT = true;
	}
	if (game.physics.arcade.overlap(joueur.sprite, chaise, stopPlayer) === true) {
		RIGHT = false;
		joueur.setJump(true);
	}
	game.physics.arcade.overlap(joueur.sprite, background.sprite, rebondSol);
	game.physics.arcade.overlap(joueur.sprite, pangolinRemikel.sprite, joueurKill);
	background.stage1();
	joueur.aniJoueur();
	if(joueur.getPositionY() < 300) {
		game.physics.arcade.gravity.y = 800;
	}
	if(joueur.getPositionY() > 600) {
		game.physics.arcade.gravity.y = 400;
	}
	if(cursors.left.isDown) {

		joueur.moveLeft();
	}
	if(cursors.right.isDown) {
		if(RIGHT === true) {
			joueur.moveRight();
		}
	}
	if(cursors.down.isDown) {
		joueur.moveBottom();
	}
	if(cursors.up.isDown) {
		etatJump = joueur.getEtatJump();
		if(joueur.getPositionY() >= mapHeight - 50) {
			etatJump = joueur.getEtatJump();
			joueur.moveTop(1, etatJump);
		} else {
			joueur.moveTop(2, etatJump);
		}
		RIGHT = true;
	}
	suit = pangolinRemikel.suit();
	console.log(game.physics.arcade.collide(joueur.sprite, obstacle.children[0], stopPlayer));
	chaise.x -= scroll;
	if(chaise.x === -6) {
		chaise.x = mapWidth;
	}
}
function stopPlayer(obj1, obj2) {
	joueur.sprite.x -= scroll;
	console.log('stop');
}
function rebondSol(obj1, obj2) {
	console.log("rage");
}
function joueurKill(obj1, obj2) {
	console.log('toto');
	joueur.sprite.kill();
}