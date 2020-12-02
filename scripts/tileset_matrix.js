var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("imgtiles", "../assets/tileset/deserto.png");
}

function create() {
  var level = [
    [-1, 5, -1, -1, -1, -1, -1],
    [27, 28, 29, -1, -1, -1, -1],
    [-1, -1, -1, 27, 28, 29, -1],
    [-1, 4, -1, -1, 3, -1, -1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  var map = this.make.tilemap({
    data: level,
    tileWidth: 128,
    tileHeight: 128
  });

  var tiles = map.addTilesetImage("imgtiles");
  var layer = map.createStaticLayer(0, tiles, 0, 0);

}

function update (time, delta) {
  
}