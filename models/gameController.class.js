class GameController {
  canvas;
  mouse;
  keyboard;
  world;
  menue;
  state = "menue";
  firstLoad = true;
  device = null;

  constructor(canvas, ctx, mouse, keyboard) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
    
    this.keyboard = keyboard;
    this.loop();
    this.getDevice();
    this.checkOrientationAndStart();

    window.addEventListener('resize',()=>{
      this.checkOrientationAndStart();
    });

    window.addEventListener('orientationchange',()=>{
      this.checkOrientationAndStart();
    });
    if(this.getDevice()){
      document.getElementById('headline').classList.add('d-none');    }
  }

  getDeviceData() {
    let screenW = this.getDeviceScreenW();
    let screenH = this.getDeviceScreenH();
    if (this.getDevice()) {
      this.device = 'mobile'
      this.canvas.width = screenW;
      this.canvas.height = screenH;
    }
  }

  loadMenue() {
    this.mouse.block = false;
    if (this.firstLoad) {
      this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld(),);
      this.state = "menue";
      this.firstLoad = false;
    } else {
      this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld(),);
      this.state = "menue";
      
    }
  }



  checkOrientationAndStart() {
    if (this.isLandscape()) {
        if (this.state === "blocked" || (!this.world && !this.menue)) {
            this.getDeviceData();
            this.loadMenue();
        }
    } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        this.state = "blocked";
        this.showRotateScreen(); 
    }
}


  showRotateScreen() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.font = "30px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Bitte ins Querformat drehen!", this.canvas.width / 2, this.canvas.height / 2);
}

  getDeviceScreenW() {
    
    return window.innerWidth;
      }
  getDeviceScreenH() {
    return window.innerHeight;
  }


  loadWorld() {
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
      this.loadMenue()
    , this.device);
    this.state = "game";
    
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

  getDevice() {
    return (
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }

  isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
   }

                  //cleanup funktion implementieren die animationrequests loescht
}
