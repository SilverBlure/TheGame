class ThrowableObject extends MovableObject {

    speedY;
    attackAnimation;
    direction;
    outOfRange;
    yStart;


    constructor(x, y, direction) {
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.outOfRange = false;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        this.throw(this.x + 180, this.y + 70);
        this.oldX = this.x + 180;

    }



    throw(x, y) {
        this.x = this.direction ? x - 180 : x;
        this.y = y;
        this.speedY = 30;
        this.x + this.speedY;
        let direction = true;
        let rangeOfSinus = 20;
        this.yStart = this.y;

        const directionOffset = this.direction ? -10 : 10;

        const interval = setInterval(() => {
            this.x += directionOffset;
            if (direction){
                this.y++;
                console.log("increase!")
                if(this.yStart >= this.yStart + rangeOfSinus){
                    this.direction= false;}

            }else if(!direction){
                this.y--;
                console.log("decrease!")

                if(this.yStart <= rangeOfSinus/2){
                    this.direction= true;
                }
            }

            if(this.oldX + 200 <= this.x){
                this.outOfRange = true;
            };
        }, 50);


        this.intervals.push(interval);
    }

}