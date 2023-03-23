import * as THREE from "three";
import Experience from "../Experience.js";
import Controls from "./controls.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import Hero from "./Hero.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.controls = new Controls();

    //test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    this.resources.on("ready", () => {
      console.log("resources are ready");
      //Setup
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();
      this.hero = new Hero();
    });
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
