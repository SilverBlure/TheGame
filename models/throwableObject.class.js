class ThrowableObject extends MovableObject{

    speedY;
    attackAnimation 
    direction
    coolDownReady;
    time;
    timeStamp;

    constructor(x, y, direction){
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        this.time =  0;
        this.throw(this.x + 180,this.y + 70);
        this.coolDown();
    }


    throw(x, y){
        this.timeStamp = new Date().getDate();
    this.checkDirection();
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50);
    }

    checkDirection(){
        if(this.direction){
            console.log(direction);
        }
    }

    coolDown(){     
        this.time = new Date().getTime();
        let timeInSec = this.time /1000;
        this.timeStamp = this.timeStamp /1000;
        let timeDifference = timeInSec - this.timeStamp;
        console.log(timeDifference);
        // if(){
        //     console.log("true");
        // } else {
        //     console.log("false");
        // }
        

    }
}