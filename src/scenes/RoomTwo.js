class RoomTwo extends Phaser.Scene {
    constructor() {
        super("roomTwoScene")
    }

    init(data) {
        this.locked = data.locked
        this.power = data.power
    }

    create() {
        console.log("room2")
        this.add.image(400, 195, 'roomTwoBG').setScale(1.01)
        this.password

        this.roomOneButton = this.add.rectangle(75, 215, 100, 250, 0x000000, 0).setInteractive().on('pointerdown', () => {
            this.scene.start("roomOneScene", {
                locked: this.locked,
                power: this.power
            })
        })

        this.powerButton = this.add.rectangle(700, 220, 150, 270, 0x000000, 0).setInteractive().on('pointerdown', () => {
            if (this.password == "coffee") {
                console.log("Power restored!")
                this.power = true
            } else
                console.log("Access computer to restart power")
        })

        this.computerButton = this.add.rectangle(450, 170, 150, 100, 0x000000, 0).setInteractive().on('pointerdown', () => {
            this.password = this.passwordPrompt()
        })
    }

    passwordPrompt() {
        const userInput = prompt("Enter password:");

        if (userInput !== null && userInput.length > 0) {
            console.log("User entered:", userInput);
            return userInput;
        } else {
            console.log("User cancelled or entered nothing.");
            return null;
        }
    }

    update() {

    }
}