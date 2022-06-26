import * as PIXI from 'pixi.js'
import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import backgroundImage from "./images/background.jpg"
import sharkImage from "./images/shark.png"
import bulletImage from "./images/bullet.png"
import zombieImage from "./images/zombie.png"
import { Zombie } from './zombie'
import { Soldier } from './soldier'
import { Bullet } from './bullet'
import { Background } from './background'

export class Game {

    private pixi: PIXI.Application;
    private loader: PIXI.Loader;
    // fish: Fish;
    private background: Background;
    // bubble: PIXI.Sprite;
    public zombies : Zombie[] = [];
    //public bubbles: Bubble[] = [];
    private soldier : Soldier;
    private playertextures: PIXI.Texture[] = [];

    private bullets: Bullet[] = []
    private lives = 3

    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight })
        document.body.appendChild(this.pixi.view)

        this.pixi.loader
            .add('sharkTexture', sharkImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubbleImage)
            .add('background', backgroundImage)
            .add('soldier', "soldier.json")
            .add('bullet', bulletImage)
            .add('zombie', zombieImage)
        this.pixi.loader.load(() => this.doneLoading())
    }

    public doneLoading() {
         this.background = new Background(this.pixi.loader.resources["background"].texture!, this.pixi.screen.width, this.pixi.screen.height)
         this.pixi.stage.addChild(this.background);
         console.log('Loaded');

         
        for (let i = 0; i < 9; i++) {
            const texture = PIXI.Texture.from(`frame_0${i}_delay-0.1s.jpg`);
            this.playertextures.push(texture);
        }
        //let textures = this.createPlayerFrames()
        this.soldier = new Soldier(this.playertextures, this)
        this.pixi.stage.addChild(this.soldier)

        //  for (let i = 0; i < 10; i++) {
        //      console.log('Bubbel')
        //      let bubble = new Bubble(this.pixi.loader.resources["bubbleTexture"].texture!)
        //      this.pixi.stage.addChild(bubble)
        //      this.bubbles.push(bubble)
        // }

        for (let i = 0; i < 8; i++) {
            console.log('GRRR')
            let zombie = new Zombie(this.pixi.loader.resources["zombie"].texture!)
            this.zombies.push(zombie)
            this.pixi.stage.addChild(zombie)
            console.log(this.zombies)
        }

        this.pixi.ticker.add((delta) => this.update(delta))
        // this.pixi.ticker.add((delta) => this.update(delta))
    }

    private update(delta: number) {
        for(let fish of this.zombies){
            fish.update(delta)
        }
        // for(let bubble of this.bubbles){
        //     bubble.update(delta)
        // }
        this.soldier.update(delta)
        for (let bullet of this.bullets) {
            bullet.update()
        }
        this.background.update()
        this.checkBulletCollision()
        this.checkZombieCollision()
    }

    public addBullet(x: number, y: number) {
        let b = new Bullet(this.pixi.loader.resources["bullet"].texture!, this, x, y)
        this.bullets.push(b)
        this.pixi.stage.addChild(b)
    }

    public removeBullet(bullet: Bullet) {
        this.bullets = this.bullets.filter((b: Bullet) => b != bullet)
        bullet.destroy()
    }

    private checkBulletCollision() {
        for (let bullet of this.bullets) {
            for (let zombie of this.zombies) {
                if(this.collision(bullet, zombie)){
                    this.removeBullet(bullet)
                    zombie.x = 2000
                    console.log("Zombie hit")
                    this.lives = this.lives - 1;
                    if (this.lives == 0) {
                        this.soldier.destroy()
                        for (let zombie of this.zombies) {
                            zombie.destroy()
                        }
                    }
                    break
                }
            }
        }
    }

    private checkZombieCollision() {
        for (let zombie of this.zombies) {
                if(this.collision(this.soldier, zombie)){
                    zombie.x = 2000
                    console.log("Ouch")
                    break
            }
        }
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

}

new Game()