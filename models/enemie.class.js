class Pufferfish extends MovableObject {
    width = 100;
    heigth = 100;
    x;
    dmg = 5;

    
    PUFFERFISH_STAY = [
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    


    constructor() {
        super().loadImage('./../assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
       this.x = 250 + Math.random() * 500;
        this.loadImages(this.PUFFERFISH_STAY);
        this.animate();
        
        this.speed = 0.15 + Math.random() * 0.25;
        this.moveLeft();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.PUFFERFISH_STAY)
        }, 200);
    }


}   