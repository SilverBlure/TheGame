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

  loadMenue(){if(this.world){
    this.world.cleanUp()}
    this.menue = new Menue(this.canvas, this.mouse, ()=> this.loadWorld());
    this.state = 'menue';
  }
  loadWorld(){
    this.menue.cleanUp();
    this.menue = null;
    this.world = new World(this.canvas, this.keyboard, this.mouse, ()=> this.loadMenue());
    this.state = 'game';
  }

  loop() {
    if(this.state === 'menue'){
        this.menue.draw();
    }else if(this.state === 'game'){
        this.world.draw();
    }
    requestAnimationFrame(() => this.loop());
}
}