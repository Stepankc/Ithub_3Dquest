import * as THREE from "three";
import FloorShadowMaterial from "../Materials/FloorShadow";
import World from "./World";

export default class Materials {
  world = new World();
  debug = this.world.debug;
  resources = this.world.resources;

  constructor() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("materials");
    }

    this.items = {};

    this.setFloorShadow();
  }

  setFloorShadow() {
    this.items.floorShadow = new FloorShadowMaterial();
    this.items.floorShadow.depthWrite = false;
    this.items.floorShadow.shadowColor = "#45464a";
    this.items.floorShadow.uniforms.uShadowColor.value = new THREE.Color(
      this.items.floorShadow.shadowColor
    );
    this.items.floorShadow.uniforms.uAlpha.value = 0;

    this.items.floorShadow.updateMaterials = () => {
      this.items.floorShadow.uniforms.uShadowColor.value = new THREE.Color(
        this.items.floorShadow.shadowColor
      );

      for (const _item of this.objects.items) {
        for (const _child of _item.container.children) {
          if (_child.material instanceof THREE.ShaderMaterial) {
            if (_child.material.uniforms.uShadowColor) {
              _child.material.uniforms.uShadowColor.value = new THREE.Color(
                this.items.floorShadow.shadowColor
              );
            }
          }
        }
      }
    };

    // Debug
    if (this.debug.active) {
      const folder = this.debugFolder.addFolder("floorShadow");

      folder
        .addColor(this.items.floorShadow, "shadowColor")
        .onChange(this.items.floorShadow.updateMaterials);
    }
  }
}
