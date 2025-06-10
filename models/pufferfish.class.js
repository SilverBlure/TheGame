class Pufferfish extends MovableObject {
  width = 100;
  height = 100;
  x;
  y;
  dmg = 1;
  energy = 20;
  isAlive = true;
  inEndposition = false;
  randomGen = false;

  PUFFERFISH_STAY = [
    "assets/2Enemy/1PufferFish/1.Swim/swim1.png",
    "assets/2Enemy/1PufferFish/1.Swim/swim2.png",
    "assets/2Enemy/1PufferFish/1.Swim/swim3.png",
    "assets/2Enemy/1PufferFish/1.Swim/swim4.png",
    "assets/2Enemy/1PufferFish/1.Swim/swim5.png",
  ];

  PUFFERFISH_DEAD = [
    "assets/2Enemy/1PufferFish/4DIE/Dead1.png",
    "assets/2Enemy/1PufferFish/4DIE/Dead2.png",
    "assets/2Enemy/1PufferFish/4DIE/Dead3.png",
  ];

  constructor() {
    super();
    this.loadImage(this.PUFFERFISH_STAY[0]);
    this.world = null;
    this.x = 740 + Math.random() * 1600;
    this.y = 250 * Math.random();
    this.loadImages(this.PUFFERFISH_STAY);
    this.loadImages(this.PUFFERFISH_DEAD);
    this.speed = 0.15 + Math.random() * 0.25;
    
  }

  /**pufferfish animation */
  animate() {
    if (!this.isDead()) {
      this.moveLeft();
    }
    if (!this.isDead()) {
      this.playAnimation(this.PUFFERFISH_STAY);
    } else if (this.isDead() && !this.animated) {
      this.playAnimationOnce(this.PUFFERFISH_DEAD);
      setTimeout(() => {
        this.isAlive = false;
      }, 500);
    }
  }
}
