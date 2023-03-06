import "./app.module.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { scene } from "./scene/scene";

export const App = () => {
  //canvas
  const canvas = document.querySelector("canvas.webgl");

  //material
  const material = new THREE.MeshStandardMaterial({ color: "red" });
  material.roughness = 0.4;

  const materialPlane = new THREE.MeshStandardMaterial();
  materialPlane.roughness = 0.4;

  //obj
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
  );

  //plane
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), materialPlane);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;

  scene.add(mesh, plane);

  //sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    //update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.updateProjectionMatrix();

    //update render
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  //camera
  const camera = new THREE.PerspectiveCamera(
    50,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 3);
  camera.lookAt(mesh.position);
  scene.add(camera);

  //controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //axesHelp
  const axesHelper = new THREE.AxesHelper(1);
  scene.add(axesHelper);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const clock = new THREE.Clock();

  const rate = () => {
    //Clock
    const elapsedTime = clock.getElapsedTime();

    mesh.rotation.x = Math.sin(elapsedTime);
    mesh.rotation.y = Math.cos(elapsedTime);
    //update controls
    controls.update();

    //render
    renderer.render(scene, camera);

    window.requestAnimationFrame(rate);
  };

  rate();
};
