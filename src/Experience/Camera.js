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
    this.debug = this.experience.debug;
    this.startScreen = this.experience.startScreen;

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Camera");
    }

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

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.instance, "fov")
        .name("fov")
        .min(30)
        .max(100)
        .step(0.01)
        .onChange(() => {
          this.instance.updateProjectionMatrix();
        });
    }
  }

  setPointerLockControls() {
    this.firstConrol = new PointerLockControls(this.instance, this.canvas);
    this.startScreen.addEventListener("click", () => {
      this.firstConrol.lock();
    });

    this.firstConrol.addEventListener("lock", () => {
      this.startScreen.style.display = "none";
    });

    this.firstConrol.addEventListener("unlock", () => {
      this.startScreen.style.display = "block";
    });

    this.scene.add(this.firstConrol.getObject());
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {}
}
