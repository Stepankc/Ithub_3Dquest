import * as THREE from "three";
import Experience from "../Experience.js";
import Zones from "./Zones/Zones.js";

export default class Counter {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    this.time.on("tick", () => {
      this.render();
    });

    this.maxCounter = 0;
    this.counter = 0;
  }

  increase() {
    this.counter++;
  }

  reduce() {
    this.counter--
  }

  render() {
    // console.log(this.maxCounter);
    if (this.counter == this.maxCounter) {
        console.log("good!")
    }
  }
}
