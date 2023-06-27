import * as THREE from "three";
import shaderFragment from "../../Shaders/FloorShadow/fragment.glsl";
import shaderVertex from "../../Shaders/FloorShadow/vertex.glsl";

export default function FloorShadowMaterial() {
  const uniforms = {
    tShadow: { value: null },
    uShadowColor: { value: null },
    uAlpha: { value: null },
  };

  return new THREE.ShaderMaterial({
    wireframe: false,
    transparent: true,
    uniforms,
    vertexShader: shaderVertex,
    fragmentShader: shaderFragment,
  });
}
