import "./app.module.scss";
import * as THREE from "three";
import { scene } from "./scene/scene";
import { camera,sizes } from "./camera/camera";

export const App = () => {
  //canvas
  const canvas = document.querySelector("canvas.webgl");

  window.addEventListener("resize", () => {
    //update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.updateProjectionMatrix();

    //update render
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
