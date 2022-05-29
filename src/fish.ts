import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"

export class Fish extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture) {
        super(texture)
        this.scale.set(-1, 1)
        this.tint = Math.random() * 0xFFFFFF;
        // this.x = Math.random() * (-1000) -50;
        this.x = Math.random() * 500 -50
        this.y = Math.random() * (400);
        this.anchor.set(0.5);

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.fishClicked())

        // this.stage.addChild(this.fish)
        // this.fishes.push(this.fish)
    }

    fishClicked() {
        this.x = Math.random() * (-1000) -50;
        this.y = Math.random() * (400);
    }

    update(delta:number) {
        console.log("This fish is updating!")
        this.x += 1 * delta
        if (this.x > 1200) {
            this.x = Math.random() * (-1000) -50;
            this.y = Math.random() * (400);
        }
    }
}
