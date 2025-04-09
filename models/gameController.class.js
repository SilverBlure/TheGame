class GameController {
    canvas;
    mouse;
    keyboard;
    world;
    state = null;



  constructor(canvas, mouse, keyboard) {
    this.canvas = canvas;
    this.mouse = mouse;
    this.state = "menue";
    this.keyboard = keyboard;
    this.menue = new Menue(canvas, mouse);
    this.world = null;
  }

  
}