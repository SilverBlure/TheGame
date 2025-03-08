class ThrowableObject extends MovableObject{

    speedY;
    
    attackAnimation = [
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ]


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