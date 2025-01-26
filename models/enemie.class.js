class Enemie extends MovableObject {
    width = 100;
    heigth = 100;
    x;

    constructor() {
        super().loadImage('./../assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');


        this.x = Math.random() * 500;
        this.x = x;
        log(x);
    }

    moveLeft() {

    }
    log(x){
        console.log(x);
    }
}   