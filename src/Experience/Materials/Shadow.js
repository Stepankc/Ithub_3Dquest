import * as THREE from "three";
import shaderFragment from "../../Shaders/Shadow/fragment.glsl";
import shaderVertex from "../../Shaders/Shadow/vertex.glsl";

export default function ShadowMaterial() {
  const uniforms = {
    uColor: { value: null },
    uAlpha: { value: null },
    uFadeRadius: { value: null },
  };

  return new THREE.ShaderMaterial({
    wireframe: false,
    transparent: true,
    uniforms,
    vertexShader: shaderVertex,
    fragmentShader: shaderFragment,
  });
}
