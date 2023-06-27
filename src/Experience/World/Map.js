import * as THREE from "three";
import Experience from "../Experience";
import World from "./World";

export default class Map {
  experience = new Experience();
  world = new World()
  scene = this.experience.scene;
  resources = this.world.resources;
  objects = this.world.objects;
  zones = this.world.zones;

  constructor() {
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.setMainMap();
    this.setDynamic();
    this.setTriggerMesh();
    this.setZones();
  }
  setMainMap() {

    this.objects.add({
      base: this.resources.items.storeModel.scene,
      collision: this.resources.items.storeCollision.scene,
      floorShadowTexture: null,
      offset: new THREE.Vector3(0, 0, 0),
      mass: 0,
    });
  }
  setTriggerMesh() {
    //test mesh
    this.testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.testMesh2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(this.testMesh, this.testMesh2);
    this.testMesh2.position.x = 6;
    this.testMesh.name = "mesh1";
    this.testMesh.userData.drag = "draggable";
    this.testMesh2.userData.drag = "draggable";
    this.testMesh2.name = "mesh2";
  }
  setZones() {
    this.zones.add({ x: 0, y: 0 }, { x: 4, y: 4 }, this.testMesh);
    this.zones.add({ x: 10, y: 0 }, { x: 4, y: 5 }, this.testMesh2);
  }
  setDynamic() {
    this.objects.add({
      base: this.resources.items.aText.scene,
      collision: this.resources.items.aCollision.scene,
      floorShadowTexture: null,
      offset: new THREE.Vector3(5, 1, 0),
      rotation: new THREE.Euler(0, 0, 0),
      mass: 0.7,
    });
  }
}
