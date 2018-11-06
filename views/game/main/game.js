var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0}
        }
    },
    scene: [StartScreen, controls, level2]
}


var game = new Phaser.Game(config);