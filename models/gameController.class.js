class GameController {
    canvas;
    mouse;
    keyboard;
    world;
    state = 'menue';



  constructor(canvas, mouse, keyboard) {
    this.canvas = canvas;
    this.mouse = mouse;
    this.state = "menue";
    this.keyboard = keyboard;
    this.loadMenue();
    this.loop();
    
  }

  loadMenue(){
    this.menue = new Menue(this.canvas, this.mouse, ()=> this.loadWorld());
    this.state = 'menue';
  }
  loadWorld(){
    this.world = new World(this.canvas, this.keyboard, this.mouse);
    this.state = 'game';
  }

  loop() {
    if(this.state === 'menue'){
        this.menue.run();
    }else if(this.state === 'game'){
        this.world.run();
    }
    requestAnimationFrame(() => this.loop());
}
}