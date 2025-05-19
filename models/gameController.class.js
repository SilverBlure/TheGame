class GameController {
  canvas;
  mouse;
  keyboard;
  world;
  menue;
  state = "menue";
  firstLoad = true;
  device = null;
  sound = new SoundButton();

  constructor(canvas, ctx, mouse, keyboard) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
    
    this.keyboard = keyboard;
    this.loop();
    this.loadMenue();

  }

  

  loadMenue() {
    if (this.menue && this.state === "menue") return;
    this.mouse.block = false;

    this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld(), this.sound)
    this.state = "menue";
    this.firstLoad = false;
}



  checkOrientationAndStart() {
    if (this.isLandscape()) {   //checkt ob das handy wagerecht ist
        if (this.state === "blocked" || (!this.world && !this.menue)) {
            //this.getDeviceData();
            this.loadMenue();
        }
    } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.state = "blocked";
        this.showRotateScreen(); 
    }
}


//   showRotateScreen() {
//     this.ctx.fillStyle = "black";
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
//     this.ctx.fillStyle = "white";
//     this.ctx.font = "30px Arial";
//     this.ctx.textAlign = "center";
//     this.ctx.fillText("Bitte ins Querformat drehen!", this.canvas.width / 2, this.canvas.height / 2);
// }

 


  loadWorld() {
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
      this.loadMenue()
    , this.sound);
    this.state = "game";
   this.resetBoss();
    
    
  }

  loop() {
    if (this.state === "menue" && this.menue) {
      this.menue.draw();
    } else if (this.state === "game" && this.world) {
      this.world.loop();
    }else if (this.state === "blocked") {
      this.showRotateScreen();
  }
    requestAnimationFrame(() => this.loop());
  }

  resetBoss(){
    this.world.endboss.y = -300;
    this.world.endboss.energy = 120;
    this.world.bossIntroPlayed = false;
    this.world.endboss.state = null;
  }
 
 
  }
