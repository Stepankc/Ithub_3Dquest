import "./app.module.scss";

import Experience from "./Experience/Experience.js";

const experience = new Experience(
  document.querySelector("canvas.webgl"),
  document.querySelector(".screen")
);
