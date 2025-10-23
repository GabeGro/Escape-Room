class Keypad extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, code) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.scene = scene
        this.setOrigin(0.5);
        this.code = code
        this.input = ""
        this.buttons = [];

        this.initialX = 315
        this.initialY = 115
        this.digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    createButtons(scene) {
        //console.log("func called")
        for (let i = 0; i < 9; i++) {
            //console.log("loop on")
            this.buttons[i] = scene.add.rectangle(this.initialX, this.initialY, 75, 75, 0x000000, 0).setInteractive().on('pointerdown', () => {
                this.input += this.digits[i]
                console.log(this.input)
            })
            if (this.digits[i] == 3 | this.digits[i] == 6 | this.digits[i] == 9) {
                this.initialX = 315
                this.initialY += 85
            } else
                this.initialX += 85
        }

        for (let i = 0; i < 9; i++) {
            this.buttons[i].visible = true
        }
    }


    toggleVisibility() {
        for (let i = 0; i < 9; i++) {
            this.buttons[i].visible = false
        }
    }
}