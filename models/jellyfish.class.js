class Jellyfish extends MovableObject {
  energy = 20;
  base_y;
  range = 50;
  stateDirection = null;
  now = 0;

  IDLE_JELLYFISH = [
    "assets/2Enemy/2JellyFish/RegularDamage/Lila1.png",
    "assets/2Enemy/2JellyFish/RegularDamage/Lila2.png",
    "assets/2Enemy/2JellyFish/RegularDamage/Lila3.png",
    "assets/2Enemy/2JellyFish/RegularDamage/Lila4.png",
  ];

  DEAD_JELLYFISH = [
    "assets/2Enemy/2JellyFish/Dead/Lila/L1.png",
    "assets/2Enemy/2JellyFish/Dead/Lila/L3.png",
    "assets/2Enemy/2JellyFish/Dead/Lila/L3.png",
    "assets/2Enemy/2JellyFish/Dead/Lila/L4.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IDLE_JELLYFISH[0]);
    this.loadImages(this.DEAD_JELLYFISH);
    this.loadImages(this.IDLE_JELLYFISH);
    this.x = 500 + Math.random() * 1800;
    this.y = 400 * Math.random();
    this.width = 100;
    this.height = 100;
    this.speed = Math.random() * 1.5;
    this.base_y = this.y;
    this.firstSetup();
  }

  /**animating jellyfish */
  animate() {
    this.floating();
    this.regulator();
  }

  /**regulation of calls from world */
  regulator() {
    this.now++;
    if (this.now >= 30) {
      this.playAnimation(this.IDLE_JELLYFISH);
      this.now = 0;
    }
  }


  /**floating movement */
  floating() {
    if (this.stateDirection === "UP") {
      this.y += this.speed;
      if (this.y >= this.base_y + this.range) {
        this.stateDirection = "DOWN";
      }
    }
    if (this.stateDirection === "DOWN") {
      this.y -= this.speed;
      if (this.y <= this.base_y - this.range) {
        this.stateDirection = "UP";
      }
    }
  }

  /**random start options */
  firstSetup() {
    let randomNum = Math.random();
    if (randomNum > 0.5) {
      this.stateDirection = "UP";
    } else {
      this.stateDirection = "DOWN";
    }
  }
}
