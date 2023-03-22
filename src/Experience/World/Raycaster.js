import * as THREE from "three";
import Experience from "../Experience.js";

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.resize();
    this.pointer.cross;
    this.INTERSECTED = null;

    console.log(this.pointer);

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.render();
    });

    // this.render();
  }

  resize() {
    this.pointer.x = 0;
    this.pointer.y = 0;
  }

  render() {
    // update the picking ray with the camera and pointer position
    this.raycaster.setFromCamera(this.pointer, this.camera.instance);

    this.intersects = this.raycaster.intersectObjects(
      this.scene.children,
      false
    );

    if (this.intersects.length > 0) {
      var intersect = this.intersects[0].object;
      console.log(intersect);
      intersect.material.emissive.setHex(0xff0000);
    }
  }
  update() {
    this.raycaster.update();
  }
}
