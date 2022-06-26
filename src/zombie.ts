import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"

export class Zombie extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture) {
        super(texture)
        //this.tint = Math.random() * 0xFFFFFF;
        // this.x = Math.random() * (-1000) -50;
        this.x = Math.random() * 2000
        this.y = Math.random() * 700;
        this.anchor.set(0.5);

        this.interactive = true
        this.buttonMode = true
        // this.on('pointerdown', () => this.fishClicked())

        // this.stage.addChild(this.fish)
        // this.fishes.push(this.fish)
    }

    // public fishClicked() {
    //     this.x = Math.random() * (-1000) -50;
    //     this.y = Math.random() * (400);
    // }

    public update(delta:number) {
        console.log("This fish is updating!")
        this.x -= 2 * delta
        if (this.x <-100) {
            this.x = Math.random() * window.innerWidth + 50
            this.y = Math.random() * window.innerHeight;
            }
    }
}
