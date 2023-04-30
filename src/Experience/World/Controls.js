import EventEmitter from "../Utils/EventEmitter";

export default class Controls extends EventEmitter {
  constructor() {
    super();
    this.setActions();
    this.setKeyboardControls();
  }
  setActions() {
    this.actions = {
      up: false,
      right: false,
      down: false,
      left: false,
      brake: false,
    };
  }
  setKeyboardControls() { 
    this.keyboard = {
      events: {
        keyDown: (_event) => {
          switch (_event.code) {
            case "ArrowUp":
            case "KeyW":
              this.actions.up = true;
              break;

            case "ArrowRight":
            case "KeyD":
              this.actions.right = true;
              break;

            case "ArrowDown":
            case "KeyS":
              this.actions.down = true;
              break;

            case "ArrowLeft":
            case "KeyA":
              this.actions.left = true;
              break;
          }
        },

        keyUp: (_event) => {
          switch (_event.code) {
            case "ArrowUp":
            case "KeyW":
              this.actions.up = false;
              break;

            case "ArrowRight":
            case "KeyD":
              this.actions.right = false;
              break;

            case "ArrowDown":
            case "KeyS":
              this.actions.down = false;
              break;

            case "ArrowLeft":
            case "KeyA":
              this.actions.left = false;
              break;
          }
        },
      },
    };
    document.addEventListener("keydown", this.keyboard.events.keyDown);
    document.addEventListener("keyup", this.keyboard.events.keyUp);
  }
}
