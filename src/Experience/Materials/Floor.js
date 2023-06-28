import * as THREE from "three";

import shaderFragment from "../../Shaders/Floor/fragment.glsl";
import shaderVertex from "../../Shaders/Floor/vertex.glsl";

export default class FloorMaterial {
  constructor() {
    const uniforms = {
      tBackground: { value: null },
    };

    return new THREE.ShaderMaterial({
      wireframe: false,
      transparent: false,
      uniforms,
      vertexShader: shaderVertex,
      fragmentShader: shaderFragment,
    });
  }
}
