import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Application from "./Application.js";

export default class camera {
  constructor() {
    this.application = new Application();
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;

    //add Camera
    this.setInstance();

    //add Controls
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
