var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#3681f8",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 400
      }
    }
  },
  scene: [Nivel1, Nivel2]
};

var cursors;
var spaceBar;
var player;
var score = 0;
var scoreText;

function collectCoin(player, coin) {
  coin.disableBody(true, true);
  score += 10;
  scoreText.setText(`Score: ${score}`);
}

var game = new Phaser.Game(config);