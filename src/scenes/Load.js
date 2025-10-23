class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // Loading Bar
        /*let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);  // reset fill/line style
            loadingBar.fillRect(0, centerY, w * value, 5);
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });*/

        // Load Assets
        this.load.path = './assets/';
        this.load.image('toggleOn', 'toggleOn.png')
        this.load.image('toggleOff', 'toggleOff.png')
        this.load.image('exitButton', 'ExitButton.png')
        this.load.image('portrait-front', 'PortraitFront.png')
        this.load.image('portrait-back', 'PortraitBack.png')

        this.load.image('roomOneBG', 'RoomOneBG.png')
    }

    create() {
        // Go to room1 scene
        this.scene.start('roomOneScene')
    }

    update() {}
}