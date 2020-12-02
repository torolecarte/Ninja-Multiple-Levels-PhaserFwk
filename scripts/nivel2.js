
var nivel2_gameObj = {
  preload: function () {
    this.load.tilemapTiledJSON("n2", "assets/tilemap/Nivel2.json");

  },
  create: function () {
    const nivel2 = this.make.tilemap({
      key: "n2"
    });
    const tileset = nivel2.addTilesetImage("Sprites", "tiles");

    const plataformas = nivel2.createStaticLayer("plataformas", tileset, 0, 0);


    plataformas.setCollisionByProperty({
      collider: true
    });


    const spawnPoint = nivel2.findObject("objetos", obj => obj.name === "personagem");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "ninja");



    this.physics.add.collider(player, plataformas);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, nivel2.widthInPixels, nivel2.heightInPixels);
    cursors = this.input.keyboard.createCursorKeys();
    spaceBar = this.input.keyboard.addKey("SPACE");

  },
  update: function () {
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
};

var Nivel2 = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function Nivel2() {
    Phaser.Scene.call(this, {
      key: "Nivel2"
    });
  },
  preload: nivel2_gameObj.preload,
  create: nivel2_gameObj.create,
  update: nivel2_gameObj.update
});
