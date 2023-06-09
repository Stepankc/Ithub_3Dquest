export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
  },
  {
    name: "storeModel",
    type: "gltfModel",
    path: "models/store1.glb",
  },
  {
    name: "aText",
    type: "gltfModel",
    path: "models/A.glb",
  },
  {
    name: "aCollision",
    type: "gltfModel",
    path: "models/ACollision.glb",
  },
];
