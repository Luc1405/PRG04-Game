import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import sharkImage from "./images/shark.png"
import { Fish } from './fish'
import { Bubble } from './bubbles'
import { Shark } from './shark'
import { Bullet } from './bullet'

export class Game {

    private pixi: PIXI.Application;
    private loader: PIXI.Loader;
    // fish: Fish;
    private water: PIXI.Sprite;
    // bubble: PIXI.Sprite;
    public fishes : Fish[] = [];
    public bubbles: Bubble[] = [];
    private shark : Shark;

    private bullets: Bullet[] = []

    public addBullet(bullet: Bullet) {
      this.bullets.push(bullet)
      this.pixi.stage.addChild(bullet)
    }

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
        document.body.appendChild(this.pixi.view)

        this.pixi.loader
            .add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('waterTexture', waterImage)
        this.pixi.loader.load(() => this.doneLoading())

    }

    public doneLoading() {
         this.water = new PIXI.Sprite(this.pixi.loader.resources["waterTexture"].texture!);
         this.pixi.stage.addChild(this.water);
         console.log('Loaded');

        this.shark = new Shark(this.pixi.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(this.shark)

         for (let i = 0; i < 10; i++) {
             console.log('Bubbel')
             let bubble = new Bubble(this.pixi.loader.resources["bubbleTexture"].texture!)
             this.pixi.stage.addChild(bubble)
             this.bubbles.push(bubble)
        }

        for (let i = 0; i < 8; i++) {
            console.log('FIsh')
            let fish = new Fish(this.pixi.loader.resources["fishTexture"].texture!)
            this.fishes.push(fish)
            this.pixi.stage.addChild(fish)
            console.log(this.fishes)
        }

        this.pixi.ticker.add((delta) => this.update(delta))
        // this.pixi.ticker.add((delta) => this.update(delta))
    }

    private update(delta: number) {
        for(let fish of this.fishes){
            fish.update(delta)
        }
        for(let bubble of this.bubbles){
            bubble.update(delta)
        }
        this.shark.update(delta)
        for (const bullet of this.bullets) {
            bullet.update(delta)
        }
    }
}

new Game()