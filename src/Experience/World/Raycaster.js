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
    this.actions = this.experience.world.controls.actions;

    console.log(this.actions);

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.resize();
    this.pointer.cross;
    this.intersect = null;
    this.rotateH();
    this.rotateV();

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

  rotateV(side) {
    if (this.intersect != null) {
      this.intersect.geometry.rotateX(side * 0.7854)
    }
  }

  rotateH(side) {
    if (this.intersect != null) {
      this.intersect.geometry.rotateY(side * 0.7854)
    }
  }

  render() {
    // update the picking ray with the camera and pointer position
    this.raycaster.setFromCamera(this.pointer, this.camera.instance);

    this.radius.position.x = this.camera.instance.position.x;
    this.radius.position.y = this.camera.instance.position.y;
    this.radius.position.z = this.camera.instance.position.z;
 
    if (this.actions.rotateLeft) {
      if (this.actions.shift) {
        console.log("down");
        this.rotateV(-1)
      } else {
        console.log("left");
        this.rotateH(-1)
      }
      this.actions.rotateLeft = false
    } else if (this.actions.rotateRight) {
      if (this.actions.shift) {
        console.log("up");
        this.rotateV(1)
      } else {
        console.log("right");
        this.rotateH(1)
      }
      this.actions.rotateRight = false
    } 

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

    var reset = (e) => {
      this.intersect = null;
      dragging = false;
    }

    var dragging = false;

    window.addEventListener("click", (event) => {
      if (this.intersects.length > 0 && !dragging && event.button == 0) {
        for (let i = 0; i < this.intersects.length; i++) {
          if (this.intersects[i].object.userData.drag == "draggable") {
            this.intersect = this.intersects[i].object;
            this.intersect.geometry.rotateY(Math.abs(this.intersect.quaternion.y) - Math.abs(this.camera.instance.quaternion.y));
            console.log(this.intersect);
            dragging = true;
          }
        }
      } else {
        reset()
      }
    });
  }
}
