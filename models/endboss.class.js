class Endboss extends MovableObject {
  height = 300;
  width = 300;
  x = 150;
  y = -300;
  interval;
  isAlive = true;
  energy = 20;
  inMove = false;
  patternIndex;

  ENDBOSS_STAY = [
    "assets/2.Enemy/3 Final Enemy/2.floating/1.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/2.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/3.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/4.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/5.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/6.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/7.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/8.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/9.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/10.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/11.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/12.png",
    "assets/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  ENDBOSS_INTRODUCE = [
    "assets/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "assets/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  ENDBOSS_DEAD = [
    "assets/2.Enemy/3 Final Enemy/Dead/1.png",
    "assets/2.Enemy/3 Final Enemy/Dead/2.png",
    "assets/2.Enemy/3 Final Enemy/Dead/3.png",
    "assets/2.Enemy/3 Final Enemy/Dead/4.png",
    "assets/2.Enemy/3 Final Enemy/Dead/5.png",
    "assets/2.Enemy/3 Final Enemy/Dead/6.png",
  ];

  ENDBOSS_HURT = [
    "assets/2.Enemy/3 Final Enemy/Hurt/1.png",
    "assets/2.Enemy/3 Final Enemy/Hurt/2.png",
    "assets/2.Enemy/3 Final Enemy/Hurt/3.png",
    "assets/2.Enemy/3 Final Enemy/Hurt/4.png",
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

  animate() {
    if (this.idleStarted) return;
    this.idleStarted = true;

    setInterval(() => {
      if (!this.inMove) {
        console.log("Attack");
        this.attackPattern();
      }

      if (this.isDead()) {
        console.log("animation dead");

        this.playAnimationOnce(this.ENDBOSS_DEAD);
        this.stopMove();
        setTimeout(() => {
          this.isAlive = false;
          //clearInterval(interval);
        }, 3000);
        
      } else if (this.isHurt()) {
        console.log("animation hurt");
        this.playAnimation(this.ENDBOSS_HURT);
      } else {
        this.playAnimation(this.ENDBOSS_STAY);
      }
    }, 200);

    //this.world?.intervalIdCollection.push(interval);
  }

  animateIntro(callback) {
    let i = 0;

    const interval = setInterval(() => {
      this.img = this.imageCache[this.ENDBOSS_INTRODUCE[i]];
      i++;

      if (i >= this.ENDBOSS_INTRODUCE.length) {
        //clearInterval(interval);
        callback?.();
      }
      this.y = 0;
    }, 120);

    //this.world?.intervalIdCollection.push(interval); // ⬅️ vor dem clearInterval
  }

  attackPattern() {
    this.inMove = true;
    this.patternIndex = Math.random();
    
    if (this.patternIndex <= 0.33) {
      console.log("top 200");
      this.gotToPos(-70);
    } else if (this.patternIndex >= 0.33 && this.patternIndex <= 0.66) {
      console.log("middle 70");
      this.gotToPos(70);
    } else {
      console.log("bottom -70");
      this.gotToPos(200);
    }
  }

  gotToPos(value) {
    const interval = setInterval(() => {
      if (this.y < value) {
        this.y += 1;
        this.positionCheck(value);
      } else if (this.y > value) {
        this.y -= 1;
        this.positionCheck(value);
      } 
    }, 50);
  }

  positionCheck(value) {
    if (Math.abs(this.y - value) <= 10) {
      this.y = value;
      setTimeout(() => {
        this.inMove = false;
        console.log("timeoutOver"); //nach erstem mal durchlaufen geht die funktion duchch und gibt immer true an
      }, 2000);
    }
  }
}
