let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu , Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config