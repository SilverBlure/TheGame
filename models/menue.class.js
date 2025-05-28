class Menue {
  ctx;
  mouse;
  menueBG = new MenueBackground();
  startButton = new Startgame();
  fullScreen = new Fullscreen();
  loadWorld;
  originalWidth;
  originalHeight;
  fullwindow = false;
  requestAnimationFrameID;
  device;
  sound;

  constructor(canvas, mouse, loadWorld, sound) {
    this.ctx = canvas.getContext("2d");
    this.mouse = mouse;
    this.onStart = loadWorld;
    this.canvas = canvas;
    this.sound = sound;
    this.draw();
  }

  collisionWithButton(button) {
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

  checkMousePosition() {
    if (
      this.collisionWithButton(this.startButton) &&
      this.mouse.click &&
      !this.mouse.block
    ) {
      this.mouse.block = true;
      this.onStart();
    }
    if (
      this.collisionWithButton(this.fullScreen) &&
      this.mouse.click &&
      !this.mouse.block
    ) {
      this.mouse.block = true;
      this.toggleFullscreen();
    }
    if (this.collisionWithButton(this.sound) &&
      this.mouse.click &&
      !this.mouse.block) {
      this.sound.clickToggle();
    }
  }

  setReframe() {
    if (this.fullwindow) {
      this.canvas.width = this.originalWidth;
      this.canvas.height = this.originalHeight;
      this.fullwindow = false;
    } else {
      this.originalWidth = this.canvas.width;
      this.originalHeight = this.canvas.height;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.fullwindow = true;
    }
    this.startButton = new Startgame(this.canvas.width, this.canvas.height);
    this.menueBG = new MenueBackground(this.canvas.width, this.canvas.height);
    this.fullScreen = new Fullscreen(this.canvas.width, this.canvas.height);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.originalWidth = this.canvas.width;
      this.originalHeight = this.canvas.height;

      this.canvas.requestFullscreen().then(() => {
        this.setCanvasToFullscreen();
      });
    } else {
      document.exitFullscreen().then(() => {
        this.resetCanvasSize();
      });
    }
  }

  draw() {
    this.addToMap(this.menueBG);
    this.addToMap(this.startButton);
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
      this.onStart(); // Spiel starten
      console.log('menue.touchHandler')
    }
    if (this.collisionWithButton(this.fullScreen)) {
      this.toggleFullscreen(); // Fullscreen einschalten
    }
  }


  cleanUp() {
    cancelAnimationFrame(this.requestAnimationFrameID);
    this.requestAnimationFrameID = null;
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
