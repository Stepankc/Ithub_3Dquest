import * as THREE from "three";
import Experience from "../Experience.js";
import Controls from "./controls.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import Raycaster from "./Raycaster.js";
import Hero from "./Hero.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.controls = new Controls();

    // test meshes
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
    );
    testMesh.position.y = 0.5;
    this.scene.add(testMesh);

    for (let i = 0; i < 5; i++) {
      const testMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
      );
      testMesh.position.y = Math.random() * 5 + 0.5;
      testMesh.position.x = -Math.random() * 5;
      testMesh.position.z = -Math.random() * 5;
      this.scene.add(testMesh);
    }

    this.resources.on("ready", () => {
      console.log("resources are ready");
      //Setup
      this.floor = new Floor();
      this.raycaster = new Raycaster();
      // this.fox = new Fox();
      this.environment = new Environment();
      this.hero = new Hero();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
