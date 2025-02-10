class Character extends MovableObject {
    width = 250;
    height = 200;
    y = 150;
    speed = 10;
    
    IMAGES_SWIM = [
        'assets/1.Sharkie/3.Swim/1.png',
        'assets/1.Sharkie/3.Swim/2.png',
        'assets/1.Sharkie/3.Swim/3.png',
        'assets/1.Sharkie/3.Swim/4.png',
        'assets/1.Sharkie/3.Swim/5.png',
        'assets/1.Sharkie/3.Swim/6.png',
    ];
    
    IMAGES_DEAD = [
        'assets/1.Sharkie/6.dead/1.Poisoned/1.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/2.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/3.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/4.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/5.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/6.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/7.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/8.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/9.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/10.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/11.png',
        'assets/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    

    

    constructor() {
        super().loadImage('assets/1.Sharkie/3.Swim/1.png',);
        this.loadImages(this.IMAGES_SWIM);
        this.animate();
    }

    animate() {
        
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.x += this.speed;
                this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT && this.x > 0){
                this.x -= this.speed;
                this.otherDirection = true;

            }
            if(this.world.keyboard.UP && this.y > -70){          
                this.y -= this.speed;
            }
            if(this.world.keyboard.DOWN && this.y < this.world.level.level_end_y){
                this.y += this.speed;
            }
            this.world.camera_x = -this.x;
        }, 1000/60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT||this.world.keyboard.LEFT||this.world.keyboard.DOWN||this.world.keyboard.UP) {
                this.playAnimation(this.IMAGES_SWIM);  
            }
            
            }, 50);
    
        }

jump() { // remove

}

}