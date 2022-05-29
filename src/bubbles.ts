import * as PIXI from 'pixi.js'

export class Bubble extends PIXI.Sprite {

    constructor(texture : PIXI.Texture) {
        super(texture)

        this.x = Math.random() * (800 - 25) + 25;
        this.y = Math.random() * (800 - 200) + 200;
        this.anchor.set(0.5)
    }

    update(delta:number) {
        this.y -= 1 * delta
        if (this.y < -100) {
            this.y = Math.random() * (800 - 200) + 200;
            this.x = Math.random() * (800 - 25) + 25;
        }
    }
}