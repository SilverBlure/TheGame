class World {
  ctx;
  level = level1;
  character = new Character();
  enemies = level1.enemies;
  lights = level1.lights;
  backgroundObjects = level1.backgroundObjects;
  collectable = [
    new PoisonBottle("assets/4. Marcadores/Posión/Dark - Left.png", 100, 320),
    new PoisonBottle("assets/4. Marcadores/Posión/Dark - Right.png", 400, 320),
    new PoisonBottle("assets/4. Marcadores/Posión/Dark - Left.png", 700, 320),
    new PoisonBottle("assets/4. Marcadores/Posión/Dark - Right.png", 1200, 320),
    new PoisonBottle("assets/4. Marcadores/Posión/Dark - Left.png", 2100, 320),
    new Coin("assets/4. Marcadores/1. Coins/1.png", 100, 320),
    new Coin("assets/4. Marcadores/1. Coins/1.png", 550, 320),
    new Coin("assets/4. Marcadores/1. Coins/1.png", 300, 320),
    new Coin("assets/4. Marcadores/1. Coins/1.png", 2200, 320),
    new Coin("assets/4. Marcadores/1. Coins/1.png", 850, 320),
  ];
  world;
  camera_x = 0;
  keyboard;
  mouse;
  mobileController = new MobileController();
  statusBar = new StatusBar();
  poisonBar = new PoisonBar();
  coinBar = new CoinBar();
  throwableObjects = [];
  meleeAtk = [];
  state;
  fadeAlpha = 0;
  tryAgainImage = new Image();
  intervalIdCollection = [];
  requestAnimationFrameID;
  intervals = [];
  bossIntroPlayed = false;
  endboss;
  audio;
  state = null;
  now = 0;
  sound;
  frameCounter = 0;

  constructor(canvas, keyboard, mouse, onExit, sound) {

    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.mouse = mouse;
    this.sound = sound;
    this.audio = new Audio();
    this.audio.src = 'assets/sounds/gameBGMusic.wav';
    this.audio.loop = 'loop';
    this.audio.volume = '0.1';
    this.gameOver = new GameOver(this.canvas);
    this.win = new Image();
    this.win.src = "assets/6.Botones/Tittles/You win/Mesa de trabajo 1.png";
    this.setWorld();
    this.loop();
    this.state = "running";
    this.onExit = onExit;
    this.tryAgainImage = new Image();
    this.tryAgainImage.src = "assets/6.Botones/Try again/Recurso 15.png";

  }

  checkAudio() {
    if (this.sound.volumeState == 'off' || this.character.isDead() || this.state == 'won') {
      
      this.audio.pause();
    } else if (this.sound.volumeState == 'on') {
      this.audio.play();
    }
  }
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.endboss = this.level.enemies.find((e) => e instanceof Endboss);
  }



  finished() {
    if (this.endboss.isDead()) {

      this.state = 'won'
      setTimeout(() => {
        this.onExit();
      }, 1500);

    }
  }

  tryAgain() {
    if (this.character.isDead()) {
      this.state = 'gameOver'
    }
  }





  checkCharacterEnemyCollision() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(this.character, enemy) && enemy.isAlive) {
        this.character.hit(1);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCharacterCollectablesCollision() {
    this.collectable = this.collectable.filter((obj) => {
      if (this.character.isColliding(this.character, obj)) {
        if (obj instanceof PoisonBottle) {
          let sound = new Audio();
          sound.src = "assets/sounds/glassCollection.wav";
          sound.play();
          this.poisonBar.addPoison(20);

        } else if (obj instanceof Coin) {
          let sound = new Audio();
          sound.src = "assets/sounds/coinCollection.wav";
          sound.play();
          this.coinBar.addCoin(20);
        }
        return false;
      }
      return true;
    });
  }

  checkProjectileEnemyCollision() {
    let sound = new Audio();
    this.throwableObjects = this.throwableObjects.filter((projectile) => {
      let hit = false;
      this.enemies.forEach((enemy) => {
        if (this.character.isCollidingWithTrowable(projectile, enemy)) {

          enemy.hit(40);
          hit = true;
          if (enemy instanceof Pufferfish) {
            sound.src = 'assets/sounds/pufferfish_1.wav';
            sound.play();
          }
          if (enemy instanceof Endboss) {
            sound.src = 'assets/sounds/bossHurtSound.mp3';
            sound.play();
          }
          if (enemy instanceof Endboss && this.endboss.isDead()) {
            let sound = new Audio();
            sound.src = 'assets/sounds/winning.wav';
            sound.play();
          }
        }
      });
      return !hit;
    });
  }

  checkCollisionFinSlap() {
    if (this.meleeAtk.length > 0) {
      this.enemies.forEach((enemy) => {
        this.meleeAtk.forEach((fin) => {
          if (fin.isColliding(fin, enemy)) {
            enemy.hit(80);
            console.log("feuer");
          }
        });
      });
    }
  }

  checkIfEnemyRunOut() {
    this.enemies = this.enemies.filter((enemy) => {
      return enemy.x + enemy.width >= 0;
    });
  }

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
    this.checkMousePosition();
    this.checkAudio();
    //#######Enemy Intervale#######
    if (this.frameCounter % 4 == 0) {
      this.endbossInterval();
    }
    this.jellyFishInterval();
    this.pufferFishInterval();

    if (this.frameCounter > 100000) {
      this.frameCounter = 0;
    }
  }

  pufferFishInterval() {
    this.enemies.forEach((enemie) => {
      if (enemie instanceof Pufferfish) {
        enemie.animate();
      }
    });
  }

  jellyFishInterval() {
    this.enemies.forEach((enemie) => {
      if (enemie instanceof Jellyfish) {
        enemie.animate();
      }
    });
  }

  reSpawnEnemie() {
    if (this.enemies.length < 6) {
      this.enemies.push(new Pufferfish());
    }
  }

  stopProjectile() {
    this.throwableObjects = this.throwableObjects.filter((obj) => {
      return !obj.outOfRange;
    });
  }

  loop() {
    if (this.now >= 5) {
      this.update();
      this.now = 0;
    }
    this.draw();
    this.now++;
  }



  addObjectsToMap(objects) {
    objects.forEach((o) => {
      if (o !== null) {
        this.addToMap(o);
      }
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }

  clearDeadEnemys() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.isAlive) {
        return true;
      }
    });
  }

  endbossInterval() {
    if (!this.bossIntroPlayed && this.character.x >= 2100) {
      this.bossIntroPlayed = true;
      this.endboss.playAnimationOnce(this.endboss.ENDBOSS_INTRODUCE);
      setTimeout(() => {
        this.endboss.y = 0;

      }, 100);
      setTimeout(() => {
        this.endboss.state = 'idle';
      }, 1300);
    }
    if (this.bossIntroPlayed && this.endboss.state == 'idle') {
      this.endboss.animate();
    }
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
    if (this.collisionWithButton(this.sound)) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }

  checkMousePosition() {
    if (
      this.collisionWithButton(this.sound) &&
      this.mouse.click &&
      !this.mouse.block
    ) {
      this.sound.clickToggle();
      this.sound.checkState();
    }
    if (this.collisionWithButton(this.gameOver.try_again_button) &&
      this.mouse.click &&
      !this.mouse.block) {
      this.character.energy = 100;
      this.character.loadImage(this.character.IMAGES_SWIM[0]);
      this.character.animate();
      this.character.x = 150;
      this.character.y = 120;
      this.state = 'running'
      this.statusBar.setPercentage(100);

    }
  }
}
