import * as THREE from "three";
import Experience from "../Experience";

export default class Map {
  experience = new Experience();
  scene = this.experience.scene;
  zones = this.experience.world.zones;
  objects = this.experience.world.objects;
  resources = this.experience.resources;

  constructor() {
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.setDynamic();
    this.setTriggerMesh();
    this.setZones();
    this.setMainMap();
  }
  setMainMap() {
    this.store = this.resources.items.storeModel.scene;
    console.log(this.store);
    this.scene.add(this.store);
    this.store.scale.set(0.55, 0.25, 0.55);
    this.store.position.set(-1, -10, 0);
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
      offset: new THREE.Vector3(0, 5, 0),
      rotation: new THREE.Euler(0, 0, -0.2),
      mass: 0.7,
    });
    this.objects.add({
      base: this.resources.items.aText.scene,
      collision: this.resources.items.aCollision.scene,
      offset: new THREE.Vector3(0, 2, 0),
      rotation: new THREE.Euler(0, 0, 0),
      mass: 0.7,
    });
    this.objects.add({
      base: this.resources.items.aText.scene,
      collision: this.resources.items.aCollision.scene,
      offset: new THREE.Vector3(0, 10, 0),
      rotation: new THREE.Euler(0, 0, -0.2),
      mass: 0.7,
    });
  }
}
