import * as THREE from "three";
import { PointerLockControlsCannon } from "./Utils/PointerLockControlsCannon.js";
import Experience from "./Experience.js";

export default class camera {
  constructor(body) {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.startScreen = this.experience.startScreen;
    this.delta = this.experience.time.delta;
    this.body = body;

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
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.scene.add(this.instance);

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.instance, "fov")
        .name("fov")
        .min(30)
        .max(100)
        .step(1)
        .onChange(() => {
          this.instance.updateProjectionMatrix();
        });
    }
  }

  setPointerLockControls() {
    this.firstConrol = new PointerLockControlsCannon(this.instance, this.body);

    this.scene.add(this.firstConrol.getObject());

    this.startScreen.addEventListener("click", () => {
      this.firstConrol.lock();
    });

    this.firstConrol.addEventListener("lock", () => {
      this.firstConrol.enabled = true;
      this.startScreen.style.display = "none";
    });

    this.firstConrol.addEventListener("unlock", () => {
      this.firstConrol.enabled = false;
      this.startScreen.style.display = null;
    });
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.firstConrol.update(this.delta, this.instance);
  }
}
