class Character extends MovableObject {
    width = 250;
    height = 200;
    y = 150;
    speed = 10;
    IMAGES_STAY = [
        'assets/1.Sharkie/1.IDLE/1.png', //changin the pic files into swim
        'assets/1.Sharkie/1.IDLE/2.png',
        'assets/1.Sharkie/1.IDLE/3.png',
        'assets/1.Sharkie/1.IDLE/4.png',
        'assets/1.Sharkie/1.IDLE/5.png',
        'assets/1.Sharkie/1.IDLE/6.png',
        'assets/1.Sharkie/1.IDLE/7.png',
        'assets/1.Sharkie/1.IDLE/8.png',
        'assets/1.Sharkie/1.IDLE/9.png',
        'assets/1.Sharkie/1.IDLE/10.png',
        'assets/1.Sharkie/1.IDLE/11.png',
        'assets/1.Sharkie/1.IDLE/12.png',
        'assets/1.Sharkie/1.IDLE/13.png',
        'assets/1.Sharkie/1.IDLE/14.png',
        'assets/1.Sharkie/1.IDLE/15.png',
        'assets/1.Sharkie/1.IDLE/16.png',
        'assets/1.Sharkie/1.IDLE/17.png',
        'assets/1.Sharkie/1.IDLE/18.png',
    ];

    

    constructor() {
        super().loadImage('./../assets/1.Sharkie/1.IDLE/1.png',);
        this.loadImages(this.IMAGES_STAY);
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
            if(this.world.keyboard.UP && this.y > 0){               // figure out witch y coordinate is for swimming up max, character cant swimm all the way
                this.y -= this.speed;
            }
            if(this.world.keyboard.DOWN && this.y < this.world.level.level_end_y){
                this.y += this.speed;
            }
            this.world.camera_x = -this.x;
        }, 1000/60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT) {
            
                this.playAnimation(this.IMAGES_STAY)
                
            }
            }, 50);
    
        }

jump() {

}

}