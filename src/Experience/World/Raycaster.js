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
    this.intersect = null;

    this.radius = new THREE.Mesh(
      new THREE.SphereGeometry(2, 20, 20),
      (new THREE.Material().transparent = true),
      (new THREE.Material().opacity = 0.0)
    );

    console.log(this.pointer);

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.render();
    });

    this.drag();
    this.scene.add(this.radius);

    // this.render();
  }

  resize() {
    this.pointer.x = 0;
    this.pointer.y = 0;
  }

  render() {
    // update the picking ray with the camera and pointer position
    this.raycaster.setFromCamera(this.pointer, this.camera.instance);

    this.radius.position.x = this.camera.instance.position.x;
    this.radius.position.y = this.camera.instance.position.y;
    this.radius.position.z = this.camera.instance.position.z;

    if (this.intersect != null) {
      for (let o of this.intersects) {
        if (o.object == this.radius) {
          let targetPos = new THREE.Vector3(this.camera.instance.position.x,
                                            this.intersect.position.y,
                                            this.camera.instance.position.z)
          this.intersect.lookAt(targetPos)
          this.intersect.position.lerp(o.point, 0.15);
        }
      }
    }

    this.intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
  }

  update() {
    this.raycaster.update();
  }

  drag() {

    var reset = () => {
      this.intersect = null;
      dragging = false;
    }

    var dragging = false;

    window.addEventListener("click", (event) => {
      if (this.intersects.length > 0) {
        if (!dragging) {
          for (let i = 0; i < this.intersects.length; i++) {
            if (this.intersects[i].object.userData == "draggable") {
              this.intersect = this.intersects[i].object;
              console.log(this.intersect);
              dragging = true;
            } else {
            reset()
            }
          }
          
        } else {
          reset()
        }
      }
    });
  }
}
