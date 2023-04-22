import * as THREE from "three";
import Experience from "../Experience.js";
export default class Hero {
  constructor() {
    this.experience = new Experience();
    this.delta = this.experience.time.delta;
    this.controls = this.experience.camera.firstConrol;
    this.actions = this.experience.world.controls.actions;
    this.time = this.experience.time;
    this.setMovement();
    this.setMove();
  }
  setMovement() {
    this.movement = {
      velocity: new THREE.Vector3(),
      direction: new THREE.Vector3(),
    };
  }
  setMove() {
    this.time.on("tick", () => {
      this.movement.velocity.x -=
        (this.movement.velocity.x * 10.0 * this.delta) / 2000;
      this.movement.velocity.z -=
        (this.movement.velocity.z * 10.0 * this.delta) / 2000;

      this.movement.direction.z =
        Number(this.actions.up) - Number(this.actions.down);
      this.movement.direction.x =
        Number(this.actions.right) - Number(this.actions.left);

      this.movement.direction.normalize();

      if (this.actions.up || this.actions.down)
        this.movement.velocity.z -=
          (this.movement.direction.z * 400.0 * this.delta) / 2000;
      if (this.actions.left || this.actions.right)
        this.movement.velocity.x -=
          (this.movement.direction.x * 400.0 * this.delta) / 2000;

      this.controls.moveRight((-this.movement.velocity.x * this.delta) / 2000);
      this.controls.moveForward(
        (-this.movement.velocity.z * this.delta) / 2000
      );
    });
  }
}
