import * as PIXI from "pixi.js"
import { Game } from "./game"

export class Background extends PIXI.TilingSprite {

    constructor(texture: PIXI.Texture, w:number, h:number) {
        super(texture, w, h)
    }

    public update() {
        this.tilePosition.x -= 2
    }
}