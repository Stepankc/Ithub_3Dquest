import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Debug from "./Utils/Debug.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Stats from "stats.js";

export default class Experience {
  static instance = null;

  constructor(canvas,startScreen) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    //Global access
    window.experience = this;

    //add Stats
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    //Option
    this.canvas = canvas;
    this.startScreen = startScreen;

    //Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    //Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    //Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.stats.update()
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
