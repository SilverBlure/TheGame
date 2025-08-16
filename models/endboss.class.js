
class Endboss extends MovableObject {
  height = 300;
  width = 300;
  x = 2550;
  y = -300;
  energy = 120;
  intro = false;
  idleHeights = [-80, 20, 160]; // oben, mitte, unten
  currentTargetY = 180;
  attackCooldown = false;
  state = 'intro'; // intro, idle, attack, return

  ENDBOSS_STAY = [
    "assets/2Enemy/3FinalEnemy/2.floating/1.png",
    "assets/2Enemy/3FinalEnemy/2.floating/2.png",
    "assets/2Enemy/3FinalEnemy/2.floating/3.png",
    "assets/2Enemy/3FinalEnemy/2.floating/4.png",
    "assets/2Enemy/3FinalEnemy/2.floating/5.png",
    "assets/2Enemy/3FinalEnemy/2.floating/6.png",
    "assets/2Enemy/3FinalEnemy/2.floating/7.png",
    "assets/2Enemy/3FinalEnemy/2.floating/8.png",
    "assets/2Enemy/3FinalEnemy/2.floating/9.png",
    "assets/2Enemy/3FinalEnemy/2.floating/10.png",
    "assets/2Enemy/3FinalEnemy/2.floating/11.png",
    "assets/2Enemy/3FinalEnemy/2.floating/12.png",
    "assets/2Enemy/3FinalEnemy/2.floating/13.png",
  ];


  ENDBOSS_ATTACK = ["assets/2Enemy/3FinalEnemy/Attack/1.png",
    "assets/2Enemy/3FinalEnemy/Attack/2.png",
    "assets/2Enemy/3FinalEnemy/Attack/3.png",
    "assets/2Enemy/3FinalEnemy/Attack/4.png",
    "assets/2Enemy/3FinalEnemy/Attack/5.png",
    "assets/2Enemy/3FinalEnemy/Attack/6.png"
  ];

  ENDBOSS_INTRODUCE = [
    "assets/2Enemy/3FinalEnemy/1.Introduce/1.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/2.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/3.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/4.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/5.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/6.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/7.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/8.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/9.png",
    "assets/2Enemy/3FinalEnemy/1.Introduce/10.png",
  ];

  ENDBOSS_DEAD = [
    "assets/2Enemy/3FinalEnemy/Dead/1.png",
    "assets/2Enemy/3FinalEnemy/Dead/2.png",
    "assets/2Enemy/3FinalEnemy/Dead/3.png",
    "assets/2Enemy/3FinalEnemy/Dead/4.png",
    "assets/2Enemy/3FinalEnemy/Dead/5.png",
    "assets/2Enemy/3FinalEnemy/Dead/6.png",
  ];

  ENDBOSS_HURT = [
    "assets/2Enemy/3FinalEnemy/Hurt/1.png",
    "assets/2Enemy/3FinalEnemy/Hurt/2.png",
    "assets/2Enemy/3FinalEnemy/Hurt/3.png",
    "assets/2Enemy/3FinalEnemy/Hurt/4.png",
  ];



  constructor() {
    super();
    this.loadImage(this.ENDBOSS_STAY[0]);
    this.loadImages(this.ENDBOSS_STAY);
    this.loadImages(this.ENDBOSS_INTRODUCE);
    this.loadImages(this.ENDBOSS_DEAD);
    this.loadImages(this.ENDBOSS_HURT);
    this.loadImages(this.ENDBOSS_ATTACK);
    this.setStates();
    this.sound = new Audio('assets/sounds/bossHurtSound.mp3');
    this.action = false;
    this.time = new Date().getTime();
    
  }

/**setImages with token */
  setStates() {
    this.stateImages = {
      hurt: this.ENDBOSS_HURT,
      dead: this.ENDBOSS_DEAD,
      intro: this.ENDBOSS_INTRODUCE,
      attack: this.ENDBOSS_ATTACK,
      stay: this.ENDBOSS_STAY,
    }
  }

  /**
   * starting endboss interval
   */
  run() {
    const interval = setInterval(() => {

      if (!this.intro) {
        this.introduction();
      }

      this.animate();
      if (this.isDead() || this.world.character.isDead()) {
        clearInterval(interval);
      }
    }, 50);
  }

  /**animate function  */
  animate() {
    this.dead();
    this.hurt();
    this.stateBahavor();
  }

/**state switch */
  stateBahavor() {
    if (this.state == 'hurt') {
      this.playAnimation(this.stateImages.hurt);
    }
    if (this.state == 'stay') {
      this.playAnimation(this.stateImages.stay);
      this.moveToTargetY();
      this.tryStartAttack();
    }
    
    if (this.state == 'attack') {
       this.playAnimation(this.stateImages.attack);
       this.attackMove();
    }
    if (this.state == 'return') {
      this.playAnimation(this.stateImages.stay)
        this.returnToPosition();
    }
  }

  /**moves the Endboss to the gebinning position */
  introduction(){
this.intro = true;
        this.playAnimationOnce(this.ENDBOSS_INTRODUCE);
        setTimeout(() => {
          this.y = 0;
        }, 100);
        setTimeout(() => {
          this.animationeDone = true;
          this.state = 'stay';
        }, 1500);
      }

  

/**dead shifter */
  dead() {
    if (this.isDead()) {
      this.action = 'true';
      if (!this.animated) {
        this.playAnimationOnce(this.stateImages.dead);
        clearInterval(this.loopIntervalID);
      }
    }
  }
/**hurt shifter */
  hurt() {
    if (this.isHurt()) {
      this.state = 'hurt';
      setTimeout(() => {
          this.state = 'return';
      }, 1600);
    } 
  }


  /**back to beginin possition */
   returnToPosition(){
    if (this.x < 2550) {
      this.x += 20;
    } else {
      this.x = 2550;
      this.attackCooldown = false;
      this.chooseNewHeight();
      this.state = 'stay';
    }
  }

  /**going to target on the y achsis */
  moveToTargetY() {
    const diff = this.currentTargetY - this.y;
    if (Math.abs(diff) > 5) {
      this.y += diff * 0.05; // sanftes Gleiten
    } else {
      this.y = this.currentTargetY;
    }
  }

  /**attack player */
  tryStartAttack() {
    if (this.attackCooldown) return;
    this.attackCooldown = true;
    setTimeout(() => {
      this.state = 'attack';
      this.attackTargetX = this.x - 360; // Hälfte Canvas
    }, 2000);
  }

  /**attack move */
  attackMove() {
    if (this.x > this.attackTargetX) {
      this.x -= 20;
    } else {
      this.state = 'return';
    }
  }

  /**random height  */
  chooseNewHeight() {
    const idx = Math.floor(Math.random() * this.idleHeights.length);
    this.currentTargetY = this.idleHeights[idx];
  }

  /**endboss collider */
  getCollider() {
    return {
      x: this.x + 10,
      y: this.y + 140,
      width: this.width - 40,
      height: this.height - 190
    }
  }


}