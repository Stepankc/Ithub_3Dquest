import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import Experience from "./Experience.js";

export default class camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    //add Camera
    this.setInstance();

    //add Controls
    this.setPointerLockControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 3, 15);
    this.scene.add(this.instance);
  }

  setPointerLockControls() {
    this.firstConrol = new PointerLockControls(this.instance, this.canvas);
    this.canvas.addEventListener("click", () => {
      this.firstConrol.lock();
    });
    this.scene.add(this.firstConrol.getObject());
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update(){}
}
