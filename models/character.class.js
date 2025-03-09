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

    IMAGES_HURT_POISON = [
        'assets/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'assets/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'assets/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'assets/1.Sharkie/5.Hurt/1.Poisoned/4.png',

    ];

    IMAGES_HURT_SHOCK = [
        'assets/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'assets/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'assets/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ]
    
    IMAGES_DEAD_POISON= [
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

    IMAGES_DEAD_SHOCK =[
        'assets/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'assets/1.Sharkie/6.dead/2.Electro_shock/10.png',

    ]

    IMAGES_ATTACK_BUBBLE_ANIMATION = [
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'assets/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ]

    
    constructor() {
        super().loadImage('assets/1.Sharkie/3.Swim/1.png',);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_HURT_POISON);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_ANIMATION);
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
            if(this.world.keyboard.A){
                this.playAnimation(this.IMAGES_ATTACK_BUBBLE_ANIMATION);
                this.world.throwableObjects.push(new ThrowableObject(this.world.character.x, this.world.character.y));
                
            }
            this.world.camera_x = -this.x;
        }, 1000/60);

        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD_POISON);
            }else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT_POISON);
            }
            else if (this.world.keyboard.RIGHT||this.world.keyboard.LEFT||this.world.keyboard.DOWN||this.world.keyboard.UP) {
                this.playAnimation(this.IMAGES_SWIM);  
            }
            
            }, 50);
    
        }


}