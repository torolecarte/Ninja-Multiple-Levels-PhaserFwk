var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 400
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var cursors;
var spaceBar;
var player;
var score = 0;
var scoreText;


function preload() {
  this.load.image("tiles", "../assets/tilemap/deserto.png");
  //this.load.tilemapTiledJSON("map", "../assets/tilemap/exemplo.json");
  this.load.tilemapTiledJSON("map", "../assets/tilemap/MapaEx.json");
  this.load.spritesheet("ninja", "../assets/player/ninja.png", { frameWidth: 45, frameHeight: 54 });
  this.load.image("coin", "../assets/objetos/coinGold.png");
}

function create() {
  var map = this.make.tilemap({
    key: "map"
  });

  var tileset = map.addTilesetImage("Teste1", "tiles");

  var elementos = map.createStaticLayer("elementos", tileset, 0, 0);
  var plataformas = map.createStaticLayer("plataforma", tileset, 0, 0);
  plataformas.setCollisionByProperty({
    collider: true
  });

  coins = this.physics.add.group({
    key: "coin",
    repeat: 110,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
  coins.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  this.physics.add.collider(coins, plataformas);
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "24px",
    fill: "#000",
    padding: { x: 20, y: 10 },
    backgroundColor: "#ccc"
  })
    .setScrollFactor(0)
    .setDepth(30);

  player = this.physics.add.sprite(30, 0, "ninja");
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("ninja", { start: 21, end: 31 }),
    frameRate: 25,
    repeat: -1
  });
  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers("ninja", { start: 11, end: 20 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("ninja", { start: 0, end: 10 }),
    frameRate: 25,
    repeat: -1
  });
  this.physics.add.collider(player, plataformas);
  this.physics.add.overlap(player, coins, collectCoin, null, this);

  var camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey("SPACE");

  this.add.text(300, 16, "Se movimente com as setas direcionais | Espaço para pular", {
    font: "12px Verdana",
    fill: "#000",
    padding: { x: 20, y: 10 },
    backgroundColor: "#ccc"
  })
    .setScrollFactor(0)
    .setDepth(30);
}

function update() {
  var speed = 175;

  if ((cursors.up.isDown || spaceBar.isDown) && player.body.velocity.y == 0) {
    player.body.setVelocity(-400);
  }

  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
    player.anims.play("left", true);
  }
  else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
    player.anims.play("right", true);
  }
  else {
    player.body.setVelocityX(0);
    player.anims.play("turn", true);
  }
}

function collectCoin(player, coin) {
  coin.disableBody(true, true);
  score += 10;
  scoreText.setText(`Score: ${score}`);
}