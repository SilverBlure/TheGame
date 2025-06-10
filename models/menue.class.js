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
    this.draw();
    
  }

/**collision detection */
  collisionWithButton(button, x, y) {
    if(x !== undefined && y !== undefined)
    {
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

  /**hover pointer detection */
  hoverPointer() {
    if (
      this.collisionWithButton(this.startButton) ||
      this.collisionWithButton(this.fullScreen) ||
      this.collisionWithButton(this.sound)
    ) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }

  /**get mouse/finger detection */
  checkMousePosition() {
    if (
      this.collisionWithButton(this.startButton) &&
      this.mouse.click &&
      !this.mouse.block
    ) {
      this.mouse.block = true;
      this.onStart();
    }
    if (this.collisionWithButton(this.sound) &&
      this.mouse.click &&
      !this.mouse.block) {
      this.sound.clickToggle();
    }
  }

  /**draw on canvas funtion */
  draw() {
    this.addToMap(this.menueBG);
    this.addToMap(this.startButton);
    this.fullScreen.checkMode('menue');
    this.addToMap(this.fullScreen);
    this.addToMap(this.sound);
    this.checkMousePosition();
    this.hoverPointer();
    this.sound.checkState();
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
