// Toggle prefab (by Josh)
// I pulled this from another project of mine, should make a good starting point
class Toggle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frontTexture, backTexture) {
        super(scene, x, y, frontTexture, backTexture)
        scene.add.existing(this)
        this.setOrigin(0.5);
        this.setInteractive();
        this.scene = scene
        this.frontTexture = frontTexture
        this.backTexture = backTexture

        this.side = true

        // Click action
        this.on('pointerdown', () => {
            if (this.side) this.side = false
            else this.side = true
        }, this)
    }

    update() {
        if (this.side) this.setTexture(this.frontTexture)
        else this.setTexture(this.backTexture)
    }
    /*toggle() {
        this.state = !this.state
        this.setTexture(this.state ? this.frontTexture : this.backTexture)
    }*/
}