class World {
  ctx;
  level = level1;
  character = new Character();
  enemies = level1.enemies;
  lights = level1.lights;
  backgroundObjects = level1.backgroundObjects;
  collectable = [
    new PoisonBottle("assets/4.Marcadores/Posión/DarkLeft.png", 100, 320),
    new PoisonBottle("assets/4.Marcadores/Posión/DarkRight.png", 400, 320),
    new PoisonBottle("assets/4.Marcadores/Posión/DarkLeft.png", 700, 320),
    new PoisonBottle("assets/4.Marcadores/Posión/DarkRight.png", 1200, 320),
    new PoisonBottle("assets/4.Marcadores/Posión/DarkLeft.png", 2100, 320),
    new Coin("assets/4.Marcadores/1.Coins/1.png", 100, 320),
    new Coin("assets/4.Marcadores/1.Coins/1.png", 550, 320),
    new Coin("assets/4.Marcadores/1.Coins/1.png", 300, 320),
    new Coin("assets/4.Marcadores/1.Coins/1.png", 2200, 320),
    new Coin("assets/4.Marcadores/1.Coins/1.png", 850, 320),
  ];
  world;
  camera_x = 0;
  keyboard;
  mouse;
  statusBar = new StatusBar();
  poisonBar = new PoisonBar();
  coinBar = new CoinBar();
  throwableObjects = [];
  meleeAtk = [];
  tryAgainImage = new Image();
  intervalIdCollection = [];
  requestAnimationFrameID;
  bossStart = false;
  endboss;
  audio;
  device;
  state = null;
  now = 0;
  sound;
  frameCounter = 0;
  soundGlasBroke;
  audioBGMusik;

  constructor(canvas, keyboard, mouse, onExit, sound, fullScreen) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.mobileController = new MobileController(this.canvas);
    this.keyboard = keyboard;
    this.mouse = mouse;
    this.sound = sound;
    this.fullScreen = fullScreen;
    this.audioBGMusik = new Audio('assets/sounds/gameBGMusic.wav');
    this.audioBGMusik.loop = 'loop';
    this.audioBGMusik.volume = '0.1';
    this.soundGlasBroke = new Audio("assets/sounds/glassCollection.wav");
    this.soundCoinSound = new Audio("assets/sounds/coinCollection.wav");
    this.pufferfishHurt = new Audio('assets/sounds/pufferfish_1.wav');
    this.enemyEndbossDead = new Audio('assets/sounds/winning.wav')
    this.enemyEndbossHurt = new Audio('assets/sounds/bossHurtSound.mp3');
    this.gameOver = new GameOver(this.canvas);
    this.win = new Image();
    this.win.src = "assets/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
    this.setWorld();
    this.loop();
    this.state = "running";
    this.onExit = onExit;
    this.tryAgainImage = new Image();
    this.tryAgainImage.src = "assets/6.Botones/Try again/Recurso 15.png";
    this.checkDevice()
  }

  /**set device state if is mobile*/
  checkDevice() {
    if (this.isMobile()) {
      this.device = 'mobile';
    }
  }

  /**check if is a mobile device */
  isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  }

  /**check audio if play or not */
  checkAudio() {
    if (this.sound.state == false || this.character.isDead() || this.state == 'won') {
      this.audioBGMusik.pause();
    } else if (this.sound.state == true) {
      this.audioBGMusik.play();
    }
  }

  /**
   * set world object in objects
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.endboss = this.level.enemies.find((e) => e instanceof Endboss);
  }


  /**
   * calls exit function, change gamestate
   */
  finished() {
    if (this.endboss.isDead()) {
      this.state = 'won'
      setTimeout(() => {
        this.onExit();
      }, 5000);
    }
  }

  /**
   * changing gamestate if character dead
   */
  tryAgain() {
    if (this.character.isDead()) {
      this.state = 'gameOver'
    }
  }

  /**check if character is colliding mit enemie */
  checkCharacterEnemyCollision() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(this.character, enemy) && enemy.isAlive) {
        this.character.hit(1);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * check if character collects items
   */
  checkCharacterCollectablesCollision() {
    this.collectable = this.collectable.filter((obj) => {
      if (this.character.isColliding(this.character, obj)) {
        if (obj instanceof PoisonBottle) {
          this.soundGlasBroke.play();
          this.poisonBar.addPoison(20);
        } else if (obj instanceof Coin) {
          this.soundCoinSound.play();
          this.coinBar.addCoin(20);
        }
        return false;
      }
      return true;
    });
  }

  /**
   * check if projectile collides with enemie
   */
  checkProjectileEnemyCollision() {
    this.throwableObjects = this.throwableObjects.filter((projectile) => {
      let hit = false;
      this.enemies.forEach((enemy) => {
        if (this.character.isCollidingWithTrowable(projectile, enemy)) {
          enemy.hit(40);
          hit = true;
          if (enemy instanceof Pufferfish) {
            this.pufferfishHurt.play();
          }
          if (enemy instanceof Endboss) {
            this.enemyEndbossHurt.play();
          }
          if (this.endboss.isDead() && enemy instanceof Endboss) {
            this.enemyEndbossDead.play();
          }
        }
      });
      return !hit;
    });
  }

  /**
   * check if finslap hits enemie
   */
  checkCollisionFinSlap() {
    if (this.meleeAtk.length > 0) {
      this.enemies.forEach((enemy) => {
        this.meleeAtk.forEach((fin) => {
          if (fin.isColliding(fin, enemy)) {
            enemy.hit(80);
          }
        });
      });
    }
  }

  /**
   * desolves enemies out of map
   */
  checkIfEnemyRunOut() {
    this.enemies = this.enemies.filter((enemy) => {
      return enemy.x + enemy.width >= 0;
    });
  }

  /**
   * draw function draws objects on canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.backgroundObjects);
    //--------Space for FixObjects---------//
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.sound);
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.collectable);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.fullScreen.checkMode('game');
    this.addToMap(this.fullScreen);
    if (this.device === "mobile") {
      this.addToMap(this.mobileController);
    }
    if (this.state === "gameOver") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.addToMap(this.gameOver);
    }
    if (this.state === "won") {
      this.ctx.drawImage(this.win, 0, 0, this.canvas.width, this.canvas.height);
    }
  }

  /**
   * update function calls more checks
   */
  update() {
    this.frameCounter++
    //#######CollisionsAbfragen######
    this.checkCharacterEnemyCollision();
    this.checkProjectileEnemyCollision();
    this.checkCharacterCollectablesCollision();
    this.clearDeadEnemys();
    this.finished();
    this.tryAgain();
    this.checkIfEnemyRunOut();
    this.reSpawnEnemie();
    this.stopProjectile();
    this.checkCollisionFinSlap();
    this.checkAudio();
    //#######Enemy Intervale#######
    if (!this.bossStart) {
      this.endbossInterval();
      
    }
    this.jellyFishInterval();
    this.pufferFishInterval();
    if (this.frameCounter > 100000) {
      this.frameCounter = 0;
    }
  }

  /**
   * interval von pufferfish objects
   */
  pufferFishInterval() {
    this.enemies.forEach((enemie) => {
      if (enemie instanceof Pufferfish) {
        enemie.animate();
      }
    });
  }

  /**
   * interval von jellyFish objects
   */
  jellyFishInterval() {
    this.enemies.forEach((enemie) => {
      if (enemie instanceof Jellyfish) {
        enemie.animate();
      }
    });
  }

  /**
   * respawns enemies till enboss
   */
  reSpawnEnemie() {
    if (this.enemies.length < 6) {
      this.enemies.push(new Pufferfish());
    }
  }

  /**
   * stops projectiles that geos out of range
   */
  stopProjectile() {
    this.throwableObjects = this.throwableObjects.filter((obj) => {
      return !obj.outOfRange;
    });
  }

  /**loops update & draw */
  loop() {
    if (this.now >= 5) {
      this.update();
      this.now = 0;
    }
    this.draw();
    this.now++;
  }

/**
 * renders objects to map
 * @param {object} objects 
 */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      if (o !== null) {
        this.addToMap(o);
      }
    });
  }

/**
 * renders object to map
 * @param {objects} mo 
 */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

/**
 * flip image to moving side 
 * @param {object} mo 
 */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

/**
 * set mo back in movin position
 * @param {objects} mo 
 */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  /**
   * removes dead Enemys
   */
  clearDeadEnemys() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.isAlive) {
        return true;
      }
    });
  }

/**
 * interval an intro from endboss
 */
  endbossInterval() {
    if(this.character.x >= 2100){
    this.endboss.run();
    this.bossStart = true;
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

  /**set mouse to pointer  */
  hoverPointer() {
    if (this.collisionWithButton(this.sound)) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }

  cleanUp(){
    if (this.audioBGMusik) {
    this.audioBGMusik.pause();
    this.audioBGMusik.currentTime = 0;
  }

  // Cursor zurücksetzen
  document.body.style.cursor = "default";
  }

}
