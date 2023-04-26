import Experience from "../Experience.js";
import Floor from "./Floor.js";
import Map from "./Map.js";
import Controls from "./Controls.js";
import Environment from "./Environment.js";
import Fox from "./Fox.js";
import Zones from "./Zones/Zones.js";
import Physics from "./Physics.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.controls = new Controls();

    this.resources.on("ready", () => {
      //Setup
      this.createWorld();
      console.log("resources are ready");
    });
  }
  createWorld() {
    this.setFloor();
    this.setFox();
    this.setZones();
    this.setEnvironment();
    this.setMap();
    this.setPhysics();
  }
  setFloor() {
    this.floor = new Floor();
  }
  setFox() {
    this.fox = new Fox();
  }
  setZones() {
    this.zones = new Zones();
    this.scene.add(this.zones.container);
  }
  setEnvironment() {
    this.environment = new Environment();
  }
  setMap() {
    this.map = new Map();
    this.scene.add(this.map.container);
  }
  setPhysics() {
    this.physics = new Physics();
  }
  update() {
    if (this.fox) this.fox.update();
  }
}
