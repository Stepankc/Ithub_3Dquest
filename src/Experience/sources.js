import MainMapCollision from "../Models/MainMapCollision.glb";
import MainMap from "../Models/store.glb";
import ACollision from "../Models/ACollision.glb";
import Aq from "../Models/A.glb";
import px from "../Models/textures/environmentMap/px.jpg";
import nx from "../Models/textures/environmentMap/nx.jpg";
import py from "../Models/textures/environmentMap/py.jpg";
import ny from "../Models/textures/environmentMap/ny.jpg";
import pz from "../Models/textures/environmentMap/pz.jpg";
import nz from "../Models/textures/environmentMap/nz.jpg";
import grassColo from "../Models/textures/dirt/color.jpg";
import grassNorm from "../Models/textures/dirt/normal.jpg";

const sources = [
  {
    name: "storeModel",
    type: "gltfModel",
    path: MainMap,
  },
  {
    name: "storeCollision",
    type: "gltfModel",
    path: MainMapCollision,
  },
  {
    name: "aText",
    type: "gltfModel",
    path: Aq,
  },
  {
    name: "aCollision",
    type: "gltfModel",
    path: ACollision,
  },
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [px, nx, py, ny, pz, nz],
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: grassColo,
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: grassNorm,
  },
];
export default sources;
