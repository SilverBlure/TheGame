class Enemie extends MovableObject {
    width = 100;
    heigth = 100;
    x;
    

    log(){
        console.log(this.x);
    }

    constructor() {
        super().loadImage('./../assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 250 + Math.random() * 500;
        
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate(){
        this.moveLeft();
       
    }

   
    
}   