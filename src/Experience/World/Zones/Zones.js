import * as THREE from "three";

import Zone from "./Zone";
import World from "../World";
import Experience from "../../Experience";
import Counter from "../Counter.js";

export default class Zones {
  constructor() {
    this.world = new World();
    this.experience = new Experience();
    this.time = this.experience.time;
    this.container = new THREE.Object3D();
    this.counter = this.experience.world.counter;
    this.counter = new Counter();

    this.setItems();
  }
  setItems() {
    this.items = [];

    this.time.on("tick", () => {
      this.counter.maxCounter = this.items.length
      for (const zone of this.items) {
        const isIn =
          zone.target.position.x < zone.position.x + zone.size.x / 2 &&
          zone.target.position.x > zone.position.x - zone.size.x / 2 &&
          zone.target.position.y < zone.position.y + zone.size.y / 2 &&
          zone.target.position.y > zone.position.y - zone.size.y / 2;

        if (isIn && !zone.isIn) {
          console.log("in", zone.target.name);
          zone.trigger("in");
          this.counter.increase();
        } else if (!isIn && zone.isIn) {
          console.log("out", zone.target.name);
          zone.trigger("out");
          this.counter.reduce()
        }
        zone.isIn = isIn;
      }
    });
  }
  add(position, size, target) {
    const zone = new Zone(position, size, target);
    this.container.add(zone.mesh);
    this.items.push(zone);
    return zone;
  }
}
