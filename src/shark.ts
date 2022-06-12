import * as PIXI from "pixi.js";

/**
 * Fish moves towards the mouse position using vector math
 */
export class Shark extends PIXI.Sprite {
    // sets the speed of the fish
    private speed = 8;

    constructor(texture: PIXI.Texture) {
        super(texture);

        // this.tint = 0x00FF00;
        const filter = new PIXI.filters.ColorMatrixFilter();
        this.filters = [filter];
        filter.hue(100, false); // Green/yellow
        this.anchor.set(0, 0.5);
        this.x = 300;
        this.y = 100;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    onKeyUp(e: KeyboardEvent): any {
        // console.log('keyup');
    }
    onKeyDown(e: KeyboardEvent): any {
        // console.log(e.key.toUpperCase());
        switch (e.key.toUpperCase()) {
            case "W":
            case "ARROWUP":
                this.y -= this.speed;
                break;
            case "S":
            case "ARROWDOWN":
                this.y += this.speed;
                break;
            case "A":
            case "ARROWLEFT":
                this.x -= this.speed;
                break;
            case "D":
            case "ARROWRIGHT":
                this.x += this.speed;
                break;
        }
    }
    public update(delta: number) {
    }
}
