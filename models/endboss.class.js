class Endboss extends MovableObject {
  height = 300;
  width = 300;
  x = 150;
  y = -300;
  energy = 120;
  inMove = false;
  patternIndex;
  intro = "done";
  now = 0;

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
    this.world = null;
    this.x = 2550;
    this.loadImages(this.ENDBOSS_STAY);
    this.loadImages(this.ENDBOSS_INTRODUCE);
    this.loadImages(this.ENDBOSS_DEAD);
    this.loadImages(this.ENDBOSS_HURT);
  }

  animateIntro() {
    let i = 0;
    const interval = setInterval(() => {
      this.img = this.imageCache[this.ENDBOSS_INTRODUCE[i]];
      i++;
      if (i >= this.ENDBOSS_INTRODUCE.length) {
        clearInterval(interval);
      }
      this.y = 0;
    }, 120);

    this.intro = "done";
  }

  animate() {
    if (this.state == 'idle') {
      this.playAnimation(this.ENDBOSS_STAY);
    }
    if (this.isHurt()) {
      //console.log('ist verletzt!')
      //this.state = 'hurt';
      this.playAnimationOnce(this.ENDBOSS_HURT);
      setTimeout(() => {
        console.log("Back to Idle!");
        
        this.loadImage(this.ENDBOSS_STAY[0]);
        this.state = 'idle';
      }, 1300);
    } else if (this.isDead()) {
      this.playAnimationOnce(this.ENDBOSS_DEAD);
      setTimeout(() => {
        this.state = "dead"
      }, 3000);
    }
    this.now++;
  }


  checkBossLive() {
    if (!this.isAlive) {
      this.state = "won";
      setTimeout(() => {
        this.onExit();
      }, 3000);
    }
  }

  attackPattern() {
    if (!this.inMove) {
      this.patternIndex = this.rollANumber();
    }
    if (this.patternIndex >= 0.5) {
      this.y = -30;
    }

    //wenn boss ist stehend rolle eine nummer, ist nummer > ,5 boss geht
  }



  rollANumber() {
    return Math.random();
  }
}
