class MovableObject extends DrawableObject {
  speed = 1.5;
  energy = 100;
  otherDirection = false;
  lastHit = 0;
  speedY = 0;
  acceleration = 2.5;
  moveIntervall = null;
  isAlive = true;
  animationeDone = false;
  lastKeyPressed = 0;
  animated = false;
  frameCounter = 0;

  /**gravity force */
  applyGravity() {
    const interval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**isAboveGround */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**is coliding with other colider if is true otherwise with width and hight */
  isColliding(character, mo) {
    let collider1, collider2;
    if(typeof character.getCollider === 'function') 
      {collider1 = character.getCollider();}
    if(typeof mo.getCollider === 'function') 
      {collider2 = mo.getCollider();}else{
        collider2 = mo;
      }
    return (
    collider1.x < collider2.x + collider2.width &&
    collider1.x + collider1.width > collider2.x &&
    collider1.y < collider2.y + collider2.height &&
    collider1.y + collider1.height > collider2.y
  );
  }

/**isColliding with trowable objects */
  isCollidingWithTrowable(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  /**move left function */
  moveLeft() {
    this.x -= this.speed;
  }

  /**playsAnimation if is in a loop */
  playAnimation(imageArr) {
    let i = this.currentImage % imageArr.length;
    let path = imageArr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**plays animation once  */
  playAnimationOnce(imageArr) {
    this.animated = true;
    let movementInterval = setInterval(() => {
      let i = this.currentImage % imageArr.length;
      this.loadImage(imageArr[i]);
      this.currentImage++;
      if (i == imageArr.length - 1) {
        this.animated = false;
        clearInterval(movementInterval);
      }
    }, 100);
  }

  /**give a character or npc damage */
  hit(value) {
    this.energy -= value;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /** hurt state of character */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; //Difference in s
    return timepassed < 1.5;
  }
/**dead state of character */
  isDead() {
    return this.energy == 0;
  }
}
