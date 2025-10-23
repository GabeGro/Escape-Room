class RoomTwo extends Phaser.Scene {
    constructor() {
        super("roomTwoScene")
    }

    init(data) {
        this.locked = data.locked
        this.power = data.power
        this.waterInitial = data.waterInitial
    }

    create() {
        console.log("room2")
        this.add.image(400, 195, 'roomTwoBG').setScale(1.01)
        this.password
        this.waterFinished = false
        this.restartButton = new Button(this, centerX, centerY, 'Restart', () => {
           this.scene.start("roomOneScene", {
                locked: true,
                power: false,
                waterInitial: 600
            })
        })
        this.restartButton.setDepth(20)
        this.restartButton.visible = false
        /*this.water = {
            y: h + 50,
            color: 0x1E90FF,
            alpha: 0.75,
            fillTime: 60,
            distanceToFill: h + 50,
            get speed() {
                return this.distanceToFill / this.fillTime
            }
        }
        this.wave = {
            amplitude: 8,
            wavelength: 120,
            waveSpeedMultiplier: 3,
            phase: 0,
            sampleStep: 8
        }
        this.waterGraphic = this.add.graphics()
        this.waterGraphic.setDepth(0)*/
        this.roomOneButton = this.add.rectangle(75, 215, 100, 250, 0x000000, 0).setInteractive().on('pointerdown', () => {
            this.scene.start("roomOneScene", {
                locked: this.locked,
                power: this.power,
                waterInitial: this.water.y
            })
        })

        if (this.power)
            this.add.rectangle(660, 190, 20, 20, 0x00ff00, 1)
        else
            this.add.rectangle(660, 190, 20, 20, 0xff0000, 1)

        this.powerButton = this.add.rectangle(700, 220, 150, 270, 0x000000, 0).setInteractive().on('pointerdown', () => {
            if (this.password == "coffee") {
                console.log("Power restored!")
                this.power = true
                this.add.rectangle(660, 190, 20, 20, 0x00ff00, 1)
            } else
                console.log("Access computer to restart power")
        })

        this.computerButton = this.add.rectangle(450, 170, 150, 100, 0x000000, 0).setInteractive().on('pointerdown', () => {
            this.password = this.passwordPrompt()
        })

        this.water = this.add.rectangle(400, this.waterInitial, 800, 400, 0x64C8FA, 0.75)
        this.waterFinished = false
        this.waterSpeed = 0.1
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
        if (!this.waterFinished) {
            this.water.y -= this.waterSpeed
        }

        if (this.water.y <= 200) {
            this.waterFinished = true
            this.restartButton.visible = true
        }


        /*const delta = this.game.loop.delta / 1000
        if (!this.waterFinished) {
            this.water.y -= this.water.speed * delta
            const waveSpeed = this.wave.waveSpeedMultiplier * 2 * Math.PI * (this.water.speed / this.wave.wavelength)
            this.wave.phase += waveSpeed * delta
            if (this.water.y <= 0) {
                this.water.y = 0
                this.waterFinished = true
                this.restartButton.visible = true
            }
        }
        this.waterGraphic.clear()
        this.waterGraphic.fillStyle(this.water.color, this.water.alpha)
        const points = []
        for (let x = 0; x <= w; x += this.wave.sampleStep) {
            const theta = (x / this.wave.wavelength) * Math.PI * 2 + this.wave.phase
            const y = this.water.y + Math.sin(theta) * this.wave.amplitude
            points.push(new Phaser.Geom.Point(x, y))
        }
        const polyPoints = []s
        for (let p of points) polyPoints.push(p.x, p.y)
        polyPoints.push(w, h)
        polyPoints.push(0, h)
        const polygon = new Phaser.Geom.Polygon(polyPoints)
        this.waterGraphic.fillPoints(polygon.points, true)
        */
    }
}