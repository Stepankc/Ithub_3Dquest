import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import Map from "./Map.js";
import Controls from "./controls.js";
import Environment from "./Environment.js";
import Fox from "./Fox.js";
import Raycaster from "./Raycaster.js";
import Hero from "./Hero.js";
import Zones from "./Zones/Zones.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
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
      testMesh.userData = "draggable";
      testMesh.position.y = Math.random() * 5 + 0.5;
      testMesh.position.x = -Math.random() * 5;
      testMesh.position.z = -Math.random() * 5;
      this.scene.add(testMesh);
    }
    this.resources.on("ready", () => {
      //Setup
      this.raycaster = new Raycaster();
      this.createWorld();
      console.log("resources are ready");

    });
  }
  createWorld() {
    this.setFloor();
    this.setFox();
    this.setZones();
    this.setHero();
    this.setEnvironment();
    this.setMap();
  }
  setFloor() {
    this.floor = new Floor();
  }
  setFox() {
    this.fox = new Fox();
    this.scene.add(this.fox.container)
  }
  setZones() {
    this.zones = new Zones();
    this.scene.add(this.zones.container);
  }
  setEnvironment() {
    this.environment = new Environment();
  }
  setHero() {
    this.hero = new Hero();
  }
  setMap() {
    this.map = new Map();
    this.scene.add(this.map.container);
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
