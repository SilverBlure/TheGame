class GameController {
  canvas;
  mouse;
  keyboard;
  world;
  menue;
  state = "menue";
  firstLoad = true;
  device;

  constructor(canvas, ctx, mouse, keyboard) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
    this.state = "menue";
    this.keyboard = keyboard;
    this.getDeviceData();
    this.loop();
    this.getDevice(); //  must be true
    this.getDevicePosition(); //must be false
    // checkt in einem interval ob das geraet wagrecht ist oder nicht wenn nicht kommt eine aufforerung
    // wenn ja kann gespielt werden
  }

  getDeviceData() {
    let screenW = this.getDeviceScreenW();
    let screenH = this.getDeviceScreenH();
    if (this.getDevice) {
      this.canvas.width = screenW;
      this.canvas.height = screenH;
      if (!this.getDevicePosition()) {
        this.loadMenue();
      } else {
        this.block();
      }
    }
    this.loadMenue();
  }
  
  loadMenue() {
    this.mouse.block = false;
    if (this.firstLoad) {
      this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld());
      this.state = "menue";
      this.firstLoad = false;
    } else {
      this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld());
      this.state = "menue";
      this.cleanUp();
    }
  }

  getDeviceScreenW() {
    let ratio = window.devicePixelRatio || 1;
    let w = screen.width * ratio;
    return w;
  }
  getDeviceScreenH() {
    let ratio = window.devicePixelRatio || 1;
    let h = screen.height * ratio;
    return h;
  }
  block(){  //muss noch justiert werden
    let img = new Image();
    img.src = 'assets/3.Background/Barrier/1.png'
     this.ctx.drawImage(img, 200, 200, 200, 200);
  }

  loadWorld() {
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
      this.loadMenue()
    );
    this.state = "game";
    this.cleanUp();
  }

  loop() {
    if (this.state === "menue") {
      this.menue.draw();
    } else if (this.state === "game") {
      this.world.draw();
    }
    requestAnimationFrame(() => this.loop());
  }

  getDevice() {
    return (
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches
    );
  }

  getDevicePosition() {
    return window.matchMedia("(orientation: landscape)").matches;
  }

  cleanUp() {
    if (this.world || this.menue) {
      if (this.state == "game") {
        this.menue.cleanUp();
      } else if (this.state == "menue") {
        this.world.cleanUp();
      }
    }
  }
}
