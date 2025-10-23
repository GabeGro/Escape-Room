class RoomOne extends Phaser.Scene {
    constructor() {
        super("roomOneScene")
    }

    init(data) {
        this.locked = data.locked
        this.power = data.power
    }

    create() {
        console.log(this.power)
        this.activeClue
        this.add.image(400, 195, 'roomOneBG').setScale(1.01)

        this.ladderButton = this.add.rectangle(75, 200, 100, 350, 0x000000, 0).setInteractive().on('pointerdown', () => {
            if (this.power)
                console.log("You Win!")
            else
                console.log("Emergency Lock -> restore power")
        })

        this.roomTwoButton = this.add.rectangle(715, 200, 115, 280, 0x000000, 0).setInteractive().on('pointerdown', () => {
            if (this.keypad.input == "1515" | !this.locked) {
                this.locked = false
                this.scene.start("roomTwoScene", {
                    locked: this.locked,
                    power: this.power
                })
            } else
                console.log("Door Locked -> input code")

        })

        this.keypadButton = this.add.rectangle(630, 220, 35, 35, 0x000000, 0).setInteractive().on('pointerdown', () => {
            this.keypad.visible = true
            this.exitButton.visible = true
            this.activeClue = this.keypad
            this.pauseRect.visible = true
            this.keypad.createButtons(this)
            this.keypad.input = ""
        })

        //create clue buttons
        this.portraitButton = this.add.image(200, 170, 'portrait-front').setScale(0.2).setInteractive().on('pointerdown', () => {
            this.portraitClue.visible = true
            this.exitButton.visible = true
            this.activeClue = this.portraitClue
            this.pauseRect.visible = true
        })

        this.pauseRect = this.add.rectangle(400, 200, w, h, 0x000000, 0.5)
        this.pauseRect.visible = false

        //create exit button for clues
        this.exitButton = this.add.image(30, 30, 'exitButton').setScale(0.25).setInteractive().on('pointerdown', () => {
            this.activeClue.visible = false
            this.exitButton.visible = false
            this.pauseRect.visible = false
            if (this.activeClue == this.keypad)
                this.keypad.toggleVisibility()
        })
        this.exitButton.visible = false

        //create clue menus
        this.portraitClue = new Toggle(this, 400, 200, 'portrait-front', 'portrait-back').setScale(0.5)
        this.portraitClue.visible = false

        this.keypad = new Keypad(this, 400, 200, 'keypad', 1515).setScale(0.75)
        this.keypad.visible = false

        this.waterFinished = false

        this.restartButton = new Button(this, centerX, centerY, 'Restart', () => {
            this.scene.restart()
        })
        this.restartButton.setDepth(20)
        this.restartButton.visible = false

        this.water = {
            y: h + 50,
            color: 0x1E90FF,
            alpha: 0.75,
            fillTime: 60, // change here to adjust fill time in seconds!
            distanceToFill: h + 50,
            get speed() {
                return this.distanceToFill / this.fillTime;
            }
        }

        this.wave = {
            amplitude: 8,
            wavelength: 120,
            waveSpeedMultiplier: 3,
            phase: 0,
            sampleStep: 8,
            get speed() {
                return this.waveSpeedMultiplier * 2 * Math.PI;
            }
        };

        this.waterGraphic = this.add.graphics();
        this.waterGraphic.setDepth(0);

        this.showDebug = false;
        if (this.showDebug) {
            this.debugText = this.add.text(10, 10, '', { font: '16px Courier', fill: '#000' }).setDepth(10);
        }
    }
    update() {
        this.portraitClue.update()

        const delta = this.game.loop.delta / 1000;
        if (!this.waterFinished) {
            this.water.y -= this.water.speed * delta;
            const waveSpeed = this.wave.waveSpeedMultiplier * 2 * Math.PI * (this.water.speed / this.wave.wavelength)
            this.wave.phase += waveSpeed * delta;
            if (this.water.y <= 0) {
                this.water.y = 0
                this.waterFinished = true
                this.restartButton.visible = true
            }
        }

        this.waterGraphic.clear();
        this.waterGraphic.fillStyle(this.water.color, this.water.alpha);

        const points = [];
        for (let x = 0; x <= w; x += this.wave.sampleStep) {
            const theta = (x / this.wave.wavelength) * Math.PI * 2 + this.wave.phase;
            const y = this.water.y + Math.sin(theta) * this.wave.amplitude;
            points.push(new Phaser.Geom.Point(x, y));
        }
        const polyPoints = [];
        for (let p of points) polyPoints.push(p.x, p.y);
        polyPoints.push(w, h);
        polyPoints.push(0, h);

        const polygon = new Phaser.Geom.Polygon(polyPoints);
        this.waterGraphic.fillPoints(polygon.points, true);

        if (this.showDebug && this.debugText) {
            this.debugText.setText(`water.y=${this.water.y.toFixed(1)}`);
        }
    }
}
