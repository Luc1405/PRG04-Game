import * as PIXI from "pixi.js";

/**
 * Fish moves towards the mouse position using vector math
 */
export class Shark extends PIXI.Sprite {
  // sets the speed of the fish
  speed = 8;

  constructor(texture: PIXI.Texture) {
    super(texture);

    // this.tint = 0x00FF00;
    const filter = new PIXI.filters.ColorMatrixFilter();
    this.filters = [filter];
    filter.hue(100, false); // Green/yellow
    this.anchor.set(0, 0.5);
    this.x = 300;
    this.y = 100;
  }

  update(delta: number, mouseposition: PIXI.Point) {
    const distance = mouseposition.subtract(this.position).magnitude();

    if (distance > 4) {
      const direction = mouseposition.subtract(this.position).normalize();
      const progress = direction.multiplyScalar(this.speed);
      this.position = this.position.add(progress) as PIXI.ObservablePoint;

      if (distance > 4) {
        this.angle =
          (Math.atan2(direction.y, direction.x) * 180) / Math.PI + 180;
      }

      this.flipShark(direction.x, distance);
    }
  }

  flipShark(directionX: number, distance: number) {
    if (distance > 4) {
      if (directionX > 0) {
        this.scale.set(1, -1);
      } else {
        this.scale.set(1, 1);
      }
    }
  }
}
