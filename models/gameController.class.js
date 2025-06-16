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
    this.doc = document.getElementById('menue');
    this.activ = true;
    this.loop();
    this.loadMenue();
  }

  /**loading menue */
  loadMenue() {
    if (this.menue && this.state === "menue") return;
    this.mouse.block = false;
    this.state = "menue";
    this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld(), this.sound, this.fullscreen, this.state)
    this.activ  = true;
  }



  /**check if landscape mode */
  isLandscapeMode() {
    return window.innerWidth > window.innerHeight
  }


  /**gets the device desktop or mobile */
  getdevice() {
    if (this.isMobileDevice()) return "mobile"
  }


  /**gets the device desktop or mobile */
  isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


  /**loading World */
  loadWorld() {
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
    this.loadMenue()
    , this.sound, this.fullscreen);
    this.state = "game";
    this.clear();
    this.activ  = true;
  }


  /**game mode loop funktion */
  loop() {
    if (this.state === "menue" && this.menue) {
      this.menue.draw();
    } else if (this.state === "game" && this.world) {
      this.world.loop();
    }
    this.checkLandscape();
    this.checkButtons();
    requestAnimationFrame(() => this.loop());
  }


  checkButtons() {
    if (this.state === 'menue' && this.activ ) {
      this.clear()
      this.renderMenueButtons();
      this.activ = false;
      console.log('test')
    }else if(this.state === 'game' && this.activ) {
      this.clear
      this.renderGameFullscreenBTN();
      this.activ = false;
    }
    
  }



  checkLandscape() {
    if (this.isLandscapeMode()) {
      this.block.classList.add('d-none');
    } else {
      this.block.classList.remove('d-none');
    }
  }


  /**world reset funtion */
  resetGame() {
    if (this.world) {
      if (typeof this.world.cleanUp === "function") {
        this.world.cleanUp();
      }
    }
    this.loadWorld();
  }


  clear() {
    this.doc.innerHTML = '';
  }


  renderMenueButtons() {
    this.doc.innerHTML = ` 
        <div class="buttons index">
        <button  class="startButton" id="button" onclick="game.loadWorld()">Start Game</button>
        <button class="fullscreenButton" id="button" onclick="canvas.requestFullscreen()">FullScreen</button>
        </div>`;
  }

  renderGameFullscreenBTN() {
    this.doc.innerHTML = ` 
        <div class="buttons index">
        <button class="fullscreenButton inGameFullscreenBtn" id="button" onclick="canvas.requestFullscreen()">FullScreen Im Game</button>
        </div>`;
  
  }


}
