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
    "assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  PUFFERFISH_DEAD = [
    "assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead_1.png",
    "assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead_2.png",
    "assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead_3.png",
  ];

  constructor() {
    super();
    this.loadImage(
      "./../assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.world = null;
    this.x = 740 + Math.random() * 1600;
    this.y = 250 * Math.random();
    this.loadImages(this.PUFFERFISH_STAY);
    this.loadImages(this.PUFFERFISH_DEAD);
    this.speed = 0.15 + Math.random() * 0.25;
  }

  animate() {
    if (!this.isDead()) {
      this.moveLeft();
    }
    if (!this.isDead()) {
      this.playAnimation(this.PUFFERFISH_STAY);
    } else if (this.isDead() && !this.animated) {
      console.log("Pufferfish Dead!");
      this.playAnimationOnce(this.PUFFERFISH_DEAD);
      setTimeout(() => {
        this.isAlive = false;
      }, 500);
    }
  }
}
