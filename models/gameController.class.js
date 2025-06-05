class GameController {
  canvas;
  mouse;
  keyboard;
  world;
  menue;
  landscape;
  state = "menue";
  firstLoad = true;
  device = null;
  sound = new SoundButton();

  constructor(canvas, ctx, mouse, keyboard,) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
    this.keyboard = keyboard;
    this.block = document.getElementById('dialogBlock');
    this.device = this.getdevice();
    this.fullscreen = new Fullscreen(canvas);
    this.loop();
    this.loadMenue();
  }

  loadMenue() {
    if (this.menue && this.state === "menue") return;
    this.mouse.block = false;
    this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld(), this.sound, this.fullscreen)
    this.state = "menue";
    this.firstLoad = false;
  }

  isLandscapeMode() {
    if (window.innerWidth > window.innerHeight) {
      this.landscape = true;
    } else {
      this.landscape = false;
    }
  }

  getdevice() {
    if (this.isMobileDevice()) return "mobile"
  }

  isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


  loadWorld() {
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
      this.loadMenue()
      , this.sound, this.fullscreen);
    this.state = "game";
    this.resetBoss();
  }

  loop() {
    if (!this.landscape) {
      this.block.classList.remove('d-none');
    } else {
      this.block.classList.add('d-none');
    }
    if (this.state === "menue" && this.menue) {
      this.menue.draw();
    } else if (this.state === "game" && this.world) {
      this.world.loop();
    } else if (this.state === "blocked") {
      this.showRotateScreen();
    }
    this.isLandscapeMode();
    requestAnimationFrame(() => this.loop());
  }

  resetBoss() {
    this.world.endboss.y = -300;
    this.world.endboss.energy = 120;
    this.world.bossIntroPlayed = false;
    this.world.endboss.state = null;
  }

  resetGame() {
    if (this.world) {
      if (typeof this.world.cleanUp === "function") {
        this.world.cleanUp();
      }
      this.world = null;
    }

    this.loadWorld(); // oder this.loadMenue(); je nach gewünschtem Zustand
  }



}
