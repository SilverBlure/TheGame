class GameController {
    canvas;
    mouse;
    keyboard;
    world;
    menue;
    state = 'menue';
    firstLoad = true;
    



  constructor(canvas, mouse, keyboard) {
    this.canvas = canvas;
    this.mouse = mouse;
    this.state = "menue";
    this.keyboard = keyboard;
    this.loadMenue();
    this.loop();
    
  }

  loadMenue(){
    if(this.firstLoad){
    this.menue = new Menue(this.canvas, this.mouse, ()=> this.loadWorld());
    this.state = 'menue';
    this.firstLoad = false;
  }
    else
    {
    this.menue = new Menue(this.canvas, this.mouse, ()=> this.loadWorld());
    this.state = 'menue';
    this.cleanUp();
  }
    
    
  }


  loadWorld(){
   
    this.world = new World(this.canvas, this.keyboard, this.mouse, ()=> this.loadMenue());
    this.state = 'game';
    this.cleanUp();
  }

  loop() {
    if(this.state === 'menue'){
        this.menue.draw();
    }else if(this.state === 'game'){
        this.world.draw();
    }
    requestAnimationFrame(() => this.loop());
}


  cleanUp(){if(this.world || this.menue){
    if(this.state == "game"){
      this.menue.cleanUp();
      //this.menue = null;
    }else if (this.state == "menue"){
      this.world.cleanUp();
      //this.world = null;
    }}
  }
}