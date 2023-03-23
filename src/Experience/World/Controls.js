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
          switch (_event.key) {
            case "ArrowUp":
            case "w":
            case "W":
            case "ц":
            case "Ц":
              this.actions.up = true;
              break;

            case "ArrowRight":
            case "d":
            case "D":
            case "в":
            case "В":
              this.actions.right = true;
              break;

            case "ArrowDown":
            case "s":
            case "S":
            case "ы":
            case "Ы":
              this.actions.down = true;
              break;

            case "ArrowLeft":
            case "a":
            case "A":
            case "ф":
            case "Ф":
              this.actions.left = true;
              break;
          }
        },

        keyUp: (_event) => {
          switch (_event.key) {
            case "ArrowUp":
            case "w":
            case "W":
            case "ц":
            case "Ц":
              this.actions.up = false;
              break;

            case "ArrowRight":
            case "d":
            case "D":
            case "в":
            case "В":
              this.actions.right = false;
              break;

            case "ArrowDown":
            case "s":
            case "S":
            case "ы":
            case "Ы":
              this.actions.down = false;
              break;

            case "ArrowLeft":
            case "a":
            case "A":
            case "ф":
            case "Ф":
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
