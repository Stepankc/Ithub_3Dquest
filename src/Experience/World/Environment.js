import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Environment");
      this.debugFolder1 = this.debug.ui.addFolder("Light");
    }

    this.setSunLight();
    this.setAmbientLight();

    //for future
    // this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3, 3, -2.25);
    this.scene.add(this.sunLight);

    //Debug
    if (this.debug.active) {
      this.debugFolder1
        .add(this.sunLight.position, "x")
        .name("x")
        .min(-20)
        .max(20)
        .step(0.01);
      this.debugFolder1
        .add(this.sunLight.position, "y")
        .name("y")
        .min(-20)
        .max(20)
        .step(0.01);
      this.debugFolder1
        .add(this.sunLight.position, "z")
        .name("z")
        .min(-20)
        .max(20)
        .step(0.01);
      this.debugFolder1
        .add(this.sunLight, "intensity")
        .name("DirectIntensity")
        .min(0)
        .max(20)
        .step(0.001);
    }
  }

  setAmbientLight() {
    this.light = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.light);

    //Debug
    if (this.debug.active) {
      this.debugFolder1
        .add(this.sunLight, "intensity")
        .name("AmbientIntensity")
        .min(0)
        .max(20)
        .step(0.001);
    }
  }

  //it may be useful for further use
  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 2.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;
    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();

    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntens")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  }
}
