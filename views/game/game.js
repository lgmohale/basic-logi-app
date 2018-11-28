var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0}
        }
    },
    scene: [StartScreen, controls, level2]
}


var game = new Phaser.Game(config);
