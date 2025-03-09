class ThrowableObject extends MovableObject{

    speedY;
    
    attackAnimation 


    constructor(x, y){
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(this.x + 180,this.y + 70);
    }


    throw(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50);
    }
}