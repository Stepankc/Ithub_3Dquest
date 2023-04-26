import * as THREE from "three";
import { Octree } from "three/examples/jsm/math/Octree.js";
import { OctreeHelper } from "three/examples/jsm/helpers/OctreeHelper.js";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import Experience from "../Experience.js";
import Hero from "./Hero.js";

export default class Physics {
  constructor() {
    this.experience = new Experience();
    this.hero = new Hero();
    this.worldOctree = new Octree();
    this.playerCollider = new Capsule(
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0, 1, 0),
      0.5
    );

    this.GRAVITY = 30;
    this.physicsSteps = 5;
    this.playerOnFloor = false;

    this.time = this.experience.time;
    this.camera = this.experience.camera.instance;
    this.playerVelocity = this.hero.movement.velocity;
    this.delta = this.time.delta;

    this.playerCollisions();
    this.updatePlayer();
    this.setGraph();
    this.teleportPlayer();
    this.updateAll();

    // Octree Helper
    this.helper = new OctreeHelper(this.worldOctree);
    this.experience.scene.add(this.helper);
  }
  playerCollisions() {
    this.result = this.worldOctree.capsuleIntersect(this.playerCollider);
    this.playerOnFloor = false;
    if (this.result) {
      this.playerOnFloor = this.result.normal.y > 0;

      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(
          this.result.normal,
          -this.result.normal.dot(this.playerVelocity)
        );
      }

      this.playerCollider.translate(
        this.result.normal.multiplyScalar(this.result.depth)
      );
    }
  }
  updatePlayer() {
    this.dampling = Math.exp((-4 * this.delta) / 1000) - 1;
    if (!this.playerOnFloor) {
      this.playerVelocity.y -= (this.GRAVITY * this.delta) / 1000;

      this.damping *= 0.1;
    }
    this.playerVelocity.addScaledVector(this.playerVelocity, this.dampling);
    this.deltaPosition = this.playerVelocity
      .clone()
      .multiplyScalar(this.delta / 1000);
    this.playerCollider.translate(this.deltaPosition);
    this.playerCollisions();

    this.camera.position.copy(this.playerCollider.end);
  }
  setGraph() {
    this.worldOctree.fromGraphNode(this.experience.world.map.store);
  }
  teleportPlayer() {
    if (this.camera.position.y <= -25) {
      this.playerCollider.start.set(0, 0.35, 0);
      this.playerCollider.end.set(0, 1, 0);
      this.playerCollider.radius = 0.35;
      this.camera.position.copy(this.playerCollider.end);
    }
  }
  updateAll() {
    this.time.on("tick", () => {
      for (let i = 0; i < this.physicsSteps; i++) {
        this.hero.setMove();
        this.updatePlayer();
        this.teleportPlayer();
      }
    });
  }
}
