import * as THREE from "three";
import Experience from "../Experience.js";
export default class Hero {
  constructor() {
    this.experience = new Experience();
    this.delta = this.experience.time.delta;
    this.actions = this.experience.world.controls.actions;
    this.camera = this.experience.camera.instance;
    this.setMovement();
    this.setMove();
  }
  setMovement() {
    this.movement = {
      velocity: new THREE.Vector3(),
      direction: new THREE.Vector3(),
    };
  }
  getForwardVector() {
    this.camera.getWorldDirection(this.movement.direction);
    this.movement.direction.y = 0;
    this.movement.direction.normalize();
    return this.movement.direction;
  }

  getSideVector() {
    this.camera.getWorldDirection(this.movement.direction);
    this.movement.direction.y = 0;
    this.movement.direction.normalize();
    this.movement.direction.cross(this.camera.up);

    return this.movement.direction;
  }
  setMove() {
    if (this.actions.up)
      this.movement.velocity.add(
        this.getForwardVector().multiplyScalar(this.delta / 100)
      );
    if (this.actions.down)
      this.movement.velocity.add(
        this.getForwardVector().multiplyScalar(-this.delta / 100)
      );
    if (this.actions.left)
      this.movement.velocity.add(
        this.getSideVector().multiplyScalar(-this.delta / 100)
      );
    if (this.actions.right)
      this.movement.velocity.add(
        this.getSideVector().multiplyScalar(this.delta / 100)
      );
  }
}
