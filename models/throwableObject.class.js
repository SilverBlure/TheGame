class ThrowableObject extends MovableObject {

    speedY;
    attackAnimation;
    direction;


    constructor(x, y, direction) {
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        this.throw(this.x + 180, this.y + 70);


    }



    throw(x, y) {
        this.x = this.direction ? x - 180 : x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
    
        const directionOffset = this.direction ? -10 : 10;
    
        const interval = setInterval(() => {
            this.x += directionOffset;
        }, 50);
    
        
        this.intervals.push(interval);
    }
    
}