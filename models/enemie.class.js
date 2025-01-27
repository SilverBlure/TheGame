class Enemie extends MovableObject {
    width = 100;
    heigth = 100;
    x;
    PUFFERFISH_STAY = [
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];
    currentImage = 0;


    constructor() {
        super().loadImage('./../assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
       this.x = 250 + Math.random() * 500;
        this.loadImages[this.PUFFERFISH_STAY];
        this.animate();
        
    }


    animate() {
        setInterval(() => {
            let i = this.currentImage % this.PUFFERFISH_STAY.length;
            let path = this.PUFFERFISH_STAY[i];
            this.img = this.imageCach[path];
            this.currentImage++;
        }, 150);
    }


    moveLeft() {

    }

}   