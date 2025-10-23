'use strict';

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Load, RoomOne, RoomTwo ]
}

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    color: '#000',
}

let game = new Phaser.Game(config)

let w = game.config.width;
let h = game.config.height;
let centerX = w/2;
let centerY = h/2;