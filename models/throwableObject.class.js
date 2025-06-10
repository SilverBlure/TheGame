class ThrowableObject extends MovableObject {

    speedY;
    attackAnimation;
    direction;
    outOfRange;
    yStart;
    amplitude;
    t;
    frequency;


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
        this.throw(this.x + 180, this.y + 70);
        this.oldX = this.x + 180;
        this.world = world;
        this.sound = new Audio('assets/sounds/BubbleShot.wav');
        this.soundcheck();
    }
    
    /**play sound */
    soundcheck(){
        if(this.world.sound.state){
            this.sound.play();
        }
    }

/**throw poison bubble, from player position */
    throw(x, y) {
        this.x = this.direction ? x - 180 : x;
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

}