class Menue {
  ctx;
  mouse;
  menueBG = new MenueBackground();
  startButton = new Startgame();
  loadWorld;
  originalWidth;
  originalHeight;
  fullwindow = false;
  requestAnimationFrameID;
  device;


  constructor(canvas, mouse, loadWorld, sound, fullscreen) {
    this.ctx = canvas.getContext("2d");
    this.mouse = mouse;
    this.onStart = loadWorld;
    this.canvas = canvas;
    this.sound = sound;
    this.fullScreen = fullscreen;
    this.doc = document.getElementById('menue');
    this.renderElements();
    this.draw();
    this.active = false;
    

  }


  /**draw on canvas funtion */
  draw() {

    this.addToMap(this.menueBG);
    if (!this.active) {
      this.active = true;
    }
  }


  renderElements() {
    this.doc.innerHTML = ` 
        <div class="buttons">
        <button  class="startButton" id="button" onclick="game.loadWorld()">Start Game</button>
        <button class="fullscreenButton" id="button" onclick="canvas.requestFullscreen()">FullScreen</button>
        </div>`;
  }

  handleTouch(x, y) {
    this.mouse.pos_x = x;
    this.mouse.pos_y = y;
    if (this.collisionWithButton(this.startButton)) {
      this.onStart();
    }
  }


  addObjectsToMap(objects) {
    objects.forEach((o) => {
      if (o !== null) {
        this.addToMap(o);
      }
    });
  }

  addToMap(mo) {
    // invert images
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }



}
