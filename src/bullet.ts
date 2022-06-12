import * as PIXI from "pixi.js"

export class Bullet extends PIXI.Graphics {
  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y

    this.drawBullet()
  }

  private drawBullet() {
    // let graphics = new Graphics()
    this.scale.set(0.4)
    this.beginFill(0xffff00)
    this.lineStyle(4, 0x000000)
    this.moveTo(5, 0)
    this.lineTo(35, 0)
    this.lineTo(25, 35)
    this.lineTo(50, 35)
    this.lineTo(10, 110)
    this.lineTo(15, 60)
    this.lineTo(-5, 60)
    this.lineTo(5, 0)
    this.endFill()

    this.addChild(this)
  }

  public update(delta: number) {
    this.y += 5 * delta
  }
}
