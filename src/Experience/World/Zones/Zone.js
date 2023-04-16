import * as THREE from "three";

import EventEmitter from "../../Utils/EventEmitter";

export default class Zone extends EventEmitter {
  constructor(position, size, target) {
    super();
    this.position = position;
    this.size = size;
    this.target = target

    this.isIn = false;

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(size.x, size.y, 10, 1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
    );

    this.mesh.position.x = position.x
    this.mesh.position.y = position.y
    this.mesh.position.z = 1.5
  }
}
