class RoomOne extends Phaser.Scene {
    constructor() {
        super("roomOneScene")
    }

    preload() {
      
    }

    create() {
        console.log("room1")
        this.add.rectangle(400, 200, w, h, 0xBDBDBD, 1)

        this.portraitButton = this.add.image(400, 200, 'portrait-front').setScale(0.25).setInteractive().on('pointerdown', () => {
            this.portraitClue.visible = true
            this.exitButton.visible = true
        })

        this.portraitClue = new Toggle(this, 400, 200, 'portrait-front', 'portrait-back').setScale(0.5)
        this.exitButton = this.add.image(30, 30, 'exitButton').setScale(0.15).setInteractive().on('pointerdown', () => {
            this.portraitClue.visible = false
            this.exitButton.visible = false
        })
        this.portraitClue.visible = false
        this.exitButton.visible = false
    }

    update() {
        this.portraitClue.update()
    }
}