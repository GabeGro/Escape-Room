'use strict';

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
    scene: [ Load, Menu, Play ]
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