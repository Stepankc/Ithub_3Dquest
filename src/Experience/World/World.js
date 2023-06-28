import * as THREE from "three";
import Experience from "../Experience.js";
import Floor from "./Floor.js";
import Map from "./Map.js";
import Shadows from "./Shadows";
import Materials from "./Materials";
import Controls from "./Controls";
import Physics from "./Physics";
import Environment from "./Environment.js";
import Raycaster from "./Raycaster.js";
import Zones from "./Zones/Zones.js";
import Objects from "./Objects.js";

let instance = null;

export default class World {
  constructor(isNewWorld) {
    if (isNewWorld) instance = null;
    if (instance) {
      return instance;
    }
    instance = this;

    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;

    this.controls = new Controls();
    
    this.resources.on("ready", () => {
      //Setup
      this.createWorld();
      this.raycaster = new Raycaster();
      console.log("resources are ready");
    });
  }

  createWorld() {
    this.setMaterials();
    this.setShadows();
    this.setPhysics();
    this.setFloor();
    this.setObjects();
    this.setZones();
    this.setEnvironment();
    this.setMap();
  }

  setFloor() {
    this.floor = new Floor();
  }

  setPhysics() {
    this.physics = new Physics(this.camera.instance);
    this.container.add(this.physics.models.container);
    this.time.on('tick', () => {
      this.physics.update()
    });
  }

  setZones() {
    this.zones = new Zones();
    this.container.add(this.zones.container);
  }

  setEnvironment() {
    this.environment = new Environment();
  }

  setMap() {
    this.map = new Map();
    this.container.add(this.map.container);
  }

  setMaterials() {
    this.materials = new Materials();
  }

  setObjects() {
    this.objects = new Objects();
    this.container.add(this.objects.container);
  }

  setShadows() {
    this.shadows = new Shadows();
    this.container.add(this.shadows.container);
  }

  update() {
  }
}
