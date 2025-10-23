class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
    }

    create() {
        this.water = {
            y: h + 50,
            color: 0x1E90FF,
            alpha: 0.75,
            fillTime: 10, // change here to adjust fill time in seconds!
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
        const delta = this.game.loop.delta / 1000;
        this.water.y -= this.water.speed * delta;

        this.wave.phase += this.wave.speed * delta;

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