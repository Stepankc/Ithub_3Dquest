import * as THREE from "three";
import { scene } from "../scene/scene";

//sizes
export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 3);
scene.add(camera);
