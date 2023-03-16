import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor() {
    super();

    //Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 8;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    //Update timestamps
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
