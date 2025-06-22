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
  state;
  buttons = document.getElementById('buttons');



  constructor(canvas, mouse, loadWorld, sound, fullscreen, state) {
    this.ctx = canvas.getContext("2d");
    this.mouse = mouse;
    this.onStart = loadWorld;
    this.canvas = canvas;
    this.sound = sound;
    this.fullScreen = fullscreen;
    this.state = state;
    this.draw();
    this.active = false;
  }


  /**draw on canvas funtion */
  draw() {
    this.addToMap(this.menueBG);
    if (!this.active) {
      this.active = true;
      this.drawMenueButtons();

    }
  }


  drawMenueButtons() {
    this.buttons.innerHTML = `
    <button class="startButton" id="button" onclick="game.loadWorld()">Start Game</button>
    <button class="fullscreenButton" id="button" onclick="toggleFullscreen(content);">FullScreen</button>
    `;
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

/**check if colliding mouse with button pos */
  collisionWithButton(button, x, y) {
    if (x !== undefined && y !== undefined) {
      this.mouse.pos_x = x;
      this.mouse.pos_y = y;
    }
    if (
      this.mouse.pos_x > button.x &&
      this.mouse.pos_x < button.x + button.width &&
      this.mouse.pos_y > button.y &&
      this.mouse.pos_y < button.y + button.height
    ) {
      return true;
    }
    return false;
  }

}
