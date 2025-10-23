class RoomTwo extends Phaser.Scene {
    constructor() {
        super("roomTwoScene")
    }

    preload() {
      
    }

    create() {
        console.log("room2")
        this.add.image(400, 195, 'roomTwoBG').setScale(1.01)

        this.roomOneButton = this.add.rectangle(75, 215, 100, 250, 0x000000, 0).setInteractive().on('pointerdown', () => {
            this.scene.start("roomOneScene")
        })

        this.powerButton = this.add.rectangle(700, 220, 150, 270, 0x000000, 1).setInteractive().on('pointerdown', () => {
            console.log("Enter password to restart power")
        })
    }

    update() {

    }
}