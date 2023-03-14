import * as THREE from "three";
import Application from "../Application.js";
import Environment from "./Environment.js";

export default class World {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    //test mesh
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);

    this.resources.on("ready", () => {
      console.log("resources are ready");
      //Setup
      this.environment = new Environment();
    });

  }
}
