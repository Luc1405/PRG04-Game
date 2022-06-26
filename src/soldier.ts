import * as PIXI from "pixi.js";
import { Game } from "./game"

/**
 * Fish moves towards the mouse position using vector math
 */
export class Soldier extends PIXI.AnimatedSprite {
    // sets the speed of the fish
    private xspeed: number = 0
    private yspeed: number = 0
    private game: Game

    constructor(textures : any, game : Game) {
        super(textures);

        this.game = game
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

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
    
    onKeyDown(e: KeyboardEvent): any {
        // console.log(e.key.toUpperCase());
        switch (e.key.toUpperCase()) {
            case " ":
                this.shoot()
                break;
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break;
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break;
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break;
        }
    }
    public update(delta: number) {
        this.x += this.xspeed
        this.y += this.yspeed
    }

    private shoot(){
        this.game.addBullet(this.x + 80, this.y + 35)
    }
}

