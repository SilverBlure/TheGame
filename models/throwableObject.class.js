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
        if (!this.direction) {          //vill kann ich hier nochmal was einspaaren
            this.x = x;
            this.y = y;
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 50);
        } else {
            this.x = x - 180;
            this.y = y;
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x -= 10;
            }, 50);
        }
    }
    
}