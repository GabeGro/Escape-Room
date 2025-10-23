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
    scene: [ Load, RoomOne, RoomTwo ],
    /*plugins: {
        global: [
            { key: 'DomContainer', plugin: Phaser.GameObjects.DOM.DOMPlugin, start: true }
        ]
    },
    dom: {
        createContainer: true
    }*/
}

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '200 px',
    color: '#ffffff',
}

let game = new Phaser.Game(config)

let w = game.config.width;
let h = game.config.height;
let centerX = w/2;
let centerY = h/2;