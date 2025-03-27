class Pufferfish extends MovableObject {
    width = 100;
    height = 100;
    x;
    dmg = 5;
    energy = 20;
    isAlive = true;
    
    PUFFERFISH_STAY = [
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    PUFFERFISH_DEAD =  [
        'assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];
    
    


    constructor() {
        super();
        this.loadImage('./../assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 250 + Math.random() * 1600;
        this.loadImages(this.PUFFERFISH_STAY);
        this.loadImages(this.PUFFERFISH_DEAD);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
        
    }


    animate() {
        this.moveLeft();
        
        setInterval(() => {
            if(this.checkAlive()){
                this.playAnimation(this.PUFFERFISH_STAY);

                }else{
                    this.playAnimation(this.PUFFERFISH_DEAD);
                    this.stopMove();
                }
            
        }, 800);
    }

    checkAlive()   {
            return this.energy > 0; 
    }
}   