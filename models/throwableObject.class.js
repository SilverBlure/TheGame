/**
 * @class
 * represents the class for all throwable Objects
 */
class ThrowableObject extends MovableObject {
    speedY;
    attackAnimation;
    direction;
    outOfRange;
    yStart;
    amplitude;
    t;
    frequency;

/**
 * @constructor 
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {boolean} direction 
 * @param {object} world 
 * 
 * extends from MovableObjects
 * load images
 * load sound
 */
    constructor(x, y, direction, world) {
        super();
        this.loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.world = world;
        this.x = x;
        this.y = y;
        this.outOfRange = false;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        if(this.direction){
            this.throw(this.x, this.y + 80);
        }
        if(!this.direction){
            this.throw(this.x + 190, this.y + 80);
        }
        this.oldX = this.x + 180;
        this.world = world;
        this.sound = new Audio('assets/sounds/BubbleShot.wav');
        if (this.world.sound.state == 'true'){
        this.sound.play();
        }
        
    }
    
    
/**
 * throws an object from the mouth position of sharky
 * and flys from the looking direction
 * @param {number} x 
 * @param {number} y 
 */
    throw(x, y) {
        this.x = x
        this.y = y;
        this.speedY = 30;
        this.x + this.speedY;
        this.baseY = this.y;
        this.amplitude = 20;
        this.frequency = 0.1;
        this.t = 0;
        const directionOffset = this.direction ? -10 : 10;
        const interval = setInterval(() => {
            this.t++;
            this.x += directionOffset;
            this.y = this.baseY + this.amplitude * Math.sin(this.frequency * this.t);
            if(this.oldX + 200 <= this.x){
                this.outOfRange = true;
                clearInterval(interval);
            };
        }, 50);
    }
    
/**
 * returns the diameter of the bubble
 * @returns object - with parameter
 *  */
getCollider() {
    return {
      x: this.x ,
      y: this.y ,
      width: this.width ,
      height: this.height
    }
  }


}