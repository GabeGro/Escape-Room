class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    init() {}

    preload() {
        // Loading Bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);  // reset fill/line style
            loadingBar.fillRect(0, centerY, w * value, 5);
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // Load Assets
        this.load.path = './assets/';
        this.load.image('toggleOn', 'toggleOn.png')
        this.load.image('toggleOff', 'toggleOff.png')
    }

    create() {
        // Go to Menu scene
        this.scene.start('menuScene')
    }

    update() {}
}