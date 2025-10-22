// Button prefab (by Josh)
// I pulled this from another project of mine, should make a good starting point
class Button extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, callback) {
        super(scene, x, y, text, {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#704214',
            padding: { x: 10, y: 5 },
            align: 'center'
        });

        this.setOrigin(0.5);
        this.setInteractive();

        // Hover effect
        this.on('pointerover', () => this.setStyle({ fill: '#ff0000'}));
        this.on('pointerout', () => this.setStyle({ fill: '#fff'}));

        // Click action
        this.on('pointerdown', () => {
            callback()
        });

        // Add to the relevant scene
        scene.add.existing(this)
    }
}