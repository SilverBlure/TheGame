// class Endboss extends MovableObject {
//   height = 300;
//   width = 300;
//   x = 150;
//   y = -300;
//   energy = 120;
//   inMove = false;
//   patternIndex;
//   intro = false;
//   now = 0;
//   idleHeights = [50, 180, 320];
//   base_y;
//   range = 140;
//   speed = 5;

  // ENDBOSS_STAY = [
  //   "assets/2Enemy/3FinalEnemy/2.floating/1.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/2.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/3.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/4.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/5.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/6.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/7.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/8.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/9.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/10.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/11.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/12.png",
  //   "assets/2Enemy/3FinalEnemy/2.floating/13.png",
  // ];

  // ENDBOSS_INTRODUCE = [
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/1.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/2.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/3.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/4.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/5.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/6.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/7.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/8.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/9.png",
  //   "assets/2Enemy/3FinalEnemy/1.Introduce/10.png",
  // ];

  // ENDBOSS_DEAD = [
  //   "assets/2Enemy/3FinalEnemy/Dead/1.png",
  //   "assets/2Enemy/3FinalEnemy/Dead/2.png",
  //   "assets/2Enemy/3FinalEnemy/Dead/3.png",
  //   "assets/2Enemy/3FinalEnemy/Dead/4.png",
  //   "assets/2Enemy/3FinalEnemy/Dead/5.png",
  //   "assets/2Enemy/3FinalEnemy/Dead/6.png",
  // ];

  // ENDBOSS_HURT = [
  //   "assets/2Enemy/3FinalEnemy/Hurt/1.png",
  //   "assets/2Enemy/3FinalEnemy/Hurt/2.png",
  //   "assets/2Enemy/3FinalEnemy/Hurt/3.png",
  //   "assets/2Enemy/3FinalEnemy/Hurt/4.png",
  // ];

//   constructor() {
//     super();
//     this.loadImage(this.ENDBOSS_STAY[0]);
//     this.world = null;
//     this.x = 2550;
//     this.loadImages(this.ENDBOSS_STAY);
//     this.loadImages(this.ENDBOSS_INTRODUCE);
//     this.loadImages(this.ENDBOSS_DEAD);
//     this.loadImages(this.ENDBOSS_HURT);
//     this.base_y = 80;
//     this.firstSetup();
//   }

//   getCollider() {
//     return {
//       x: this.otherDirection ? this.x - 0 + 10 : this.x + 10,
//       y: this.y + 100,
//       width: this.width - 40,
//       height: this.height - 120
//     };
//   }

//   run() {
//     let interval = setInterval(() => {
//       if (!this.intro) {
//         this.intro = true;
//         this.playAnimationOnce(this.ENDBOSS_INTRODUCE);


//         setTimeout(() => {
//           this.y = 0;
//           console.log('Wird genullt!!');
//         }, 100);

//         setTimeout(() => {
//           this.state = 'idle';
//         }, 1300);

//       }
//       if (this.state === 'idle') {
//   setTimeout(() => {
//     this.state = 'attack';
//     this.attack();
//   }, 2000);
// }
//       this.animate();

//       if (this.isDead()) {
//         clearInterval(interval);
//       }
//     }, 200);
//   }


//   animate() {
//     console.log(this.range);
//     if (this.isDead()) {
//       if (this.state !== 'dead') {
//         this.state = 'dead';
//         this.playAnimationOnce(this.ENDBOSS_DEAD);
//       }
//     } else if (this.isHurt() && this.state !== 'dead') {
//       this.state = 'hurt';
//       this.playAnimationOnce(this.ENDBOSS_HURT);
//       setTimeout(() => {
//         if (this.state === 'hurt') {
//           this.state = 'idle';
//         }
//       }, 1600);
//     } else if (this.state === 'idle') {
//       this.playAnimation(this.ENDBOSS_STAY);
//       this.floating();
//     }

//   }


//   floating() {
//     if (this.stateDirection === "UP") {
//       this.y += this.speed;
//       if (this.y >= this.base_y + this.range) {
//         this.stateDirection = "DOWN";
//       }
//     }
//     if (this.stateDirection === "DOWN") {
//       this.y -= this.speed;
//       if (this.y <= this.base_y - this.range) {
//         this.stateDirection = "UP";
//       }
//     }
//   }

//   firstSetup() {
//     let randomNum = Math.random();
//     if (randomNum > 0.5) {
//       this.stateDirection = "UP";
//     } else {
//       this.stateDirection = "DOWN";
//     }
//   }


//  startAttackCycle() {
//   if (this.state !== 'idle' || this.attackCooldown) return;

//   this.attackCooldown = true;

//   setTimeout(() => {
//     this.state = 'attack';
//     this.attack();
//     this.attackCooldown = false;
//   }, 3000);
// }
  

  



// }

class Endboss extends MovableObject {
  // ...
  height = 300;
  width = 300;
  x = 2550;
  y = -300;
  energy = 120;
  intro = false;
  base_y = 180;  // Start-Höhe
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


  ENDBOSS_ATTACK = ['assets/2Enemy/3FinalEnemy/Attack/1.png',
    'assets/2Enemy/3FinalEnemy/Attack/2.png',
    'assets/2Enemy/3FinalEnemy/Attack/3.png',
    'assets/2Enemy/3FinalEnemy/Attack/4.png',
    'assets/2Enemy/3FinalEnemy/Attack/5.png',
    'assets/2Enemy/3FinalEnemy/Attack/6.png',
  ]

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
  }

  run() {
    const interval = setInterval(() => {
      if (!this.intro) {
        this.intro = true;
        this.playAnimationOnce(this.ENDBOSS_INTRODUCE);
        setTimeout(() => {
          this.y = this.base_y;
          this.state = 'idle';
        }, 1000);
      }

      this.animate();

      if (this.isDead()) {
        clearInterval(interval);
      }
    }, 50);
  }

  animate() {
    if (this.isDead()) {
      if (this.state !== 'dead') {
        this.state = 'dead';
        this.playAnimationOnce(this.ENDBOSS_DEAD);
      }
      return;
    }

    if (this.isHurt()) {
      this.state = 'hurt';
      this.playAnimationOnce(this.ENDBOSS_HURT);
      setTimeout(() => {
        if (this.state === 'hurt') this.state = 'idle';
      }, 1000);
      return;
    }

    switch (this.state) {
      case 'idle':
        this.playAnimation(this.ENDBOSS_STAY);
        this.moveToTargetY();
        this.tryStartAttack();
        break;
      case 'attack':
        this.attackMove();
        break;
      case 'return':
        this.returnToPosition();
        break;
    }
  }

  moveToTargetY() {
    const diff = this.currentTargetY - this.y;
    if (Math.abs(diff) > 5) {
      this.y += diff * 0.05; // sanftes Gleiten
    } else {
      this.y = this.currentTargetY;
    }
  }

  tryStartAttack() {
    if (this.attackCooldown) return;

    this.attackCooldown = true;

    setTimeout(() => {
      this.state = 'attack';
      this.playAnimationOnce(this.ENDBOSS_ATTACK);
      this.attackTargetX = this.x - 360; // Hälfte Canvas
    }, 2000);
  }

  attackMove() {
    if (this.x > this.attackTargetX) {
      this.x -= 20;
    } else {
      this.state = 'return';
    }
  }

  returnToPosition() {
    if (this.x < 2550) {
      this.x += 20;
    } else {
      this.x = 2550;
      this.attackCooldown = false;
      this.chooseNewHeight();
      this.state = 'idle';
    }
  }

  chooseNewHeight() {
    const idx = Math.floor(Math.random() * this.idleHeights.length);
    this.currentTargetY = this.idleHeights[idx];
  }

  getCollider() {
    return {
      x: this.x + 10,
      y: this.y + 100,
      width: this.width - 40,
      height: this.height - 120
    };
  }



}