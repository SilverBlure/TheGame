class Character extends MovableObject {
    width = 250;
    height = 200;
    y = 150;
    speed = 10;
    canAct = true;
    energy = 100;
    idleCounter = 0;
    idleTrigger = false;
    hurthasPlayed = false;
    sound;
    animationStarted = false;
    intervals = [];
    state = null;
    world;
    currentFrame = 0;
    loopIntervalID = null;


    IMAGES_SWIM = [
        'assets/1.Sharkie/3.Swim/1.png',
        'assets/1.Sharkie/3.Swim/2.png',
        'assets/1.Sharkie/3.Swim/3.png',
        'assets/1.Sharkie/3.Swim/4.png',
        'assets/1.Sharkie/3.Swim/5.png',
        'assets/1.Sharkie/3.Swim/6.png',
    ];

    IMAGES_IDLE_SLEEP = ['assets/1.Sharkie/2.Long_IDLE/i1.png',
        'assets/1.Sharkie/2.Long_IDLE/I2.png',
        'assets/1.Sharkie/2.Long_IDLE/I3.png',
        'assets/1.Sharkie/2.Long_IDLE/I4.png',
        'assets/1.Sharkie/2.Long_IDLE/I5.png',
        'assets/1.Sharkie/2.Long_IDLE/I6.png',
        'assets/1.Sharkie/2.Long_IDLE/I7.png',
        'assets/1.Sharkie/2.Long_IDLE/I8.png',
        'assets/1.Sharkie/2.Long_IDLE/I9.png',
        'assets/1.Sharkie/2.Long_IDLE/I10.png',
        'assets/1.Sharkie/2.Long_IDLE/I11.png',
        'assets/1.Sharkie/2.Long_IDLE/I12.png',
        'assets/1.Sharkie/2.Long_IDLE/I13.png',
        'assets/1.Sharkie/2.Long_IDLE/I14.png'];

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

    IMAGES_DEAD_POISON = [
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

    IMAGES_DEAD_SHOCK = [
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

    FIN_MELEE_HIT = [
        'assets/1.Sharkie/4.Attack/Fin slap/1.png',
        'assets/1.Sharkie/4.Attack/Fin slap/2.png',
        'assets/1.Sharkie/4.Attack/Fin slap/3.png',
        'assets/1.Sharkie/4.Attack/Fin slap/4.png',
        'assets/1.Sharkie/4.Attack/Fin slap/5.png',
        'assets/1.Sharkie/4.Attack/Fin slap/6.png',
        'assets/1.Sharkie/4.Attack/Fin slap/7.png',
        'assets/1.Sharkie/4.Attack/Fin slap/8.png',
    ]

    constructor() {
        super();
        this.loadImage('assets/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_DEAD_POISON);
        this.loadImages(this.IMAGES_HURT_POISON);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE_ANIMATION);
        this.loadImages(this.FIN_MELEE_HIT);
        this.loadImages(this.IMAGES_IDLE_SLEEP);
        this.setStates();
        this.sound = new Audio('assets/sounds/characterWhip.wav');
        this.animate();
    }


    setStates() {
        this.stateImages = {
            idle: this.IMAGES_SWIM,
            hurt: this.IMAGES_HURT_POISON,
            dead: this.IMAGES_DEAD_POISON,
            finAttack: this.FIN_MELEE_HIT,
            bubble: this.IMAGES_ATTACK_BUBBLE_ANIMATION
        };
    }

    /**set world in enemy */
    setWorld(world) {
        this.world = world;
    }

    /**colider of character */
    getCollider() {
        return {
            x: this.otherDirection ? this.x - 0 + 50 : this.x + 50,
            y: this.y + 100,
            width: this.width - 100,
            height: this.height - 150
        };
    }

    /**complete character animation  */
    animate() {


        if (this.loopIntervalID) return;

        this.loopIntervalID = setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.stateImages.dead);
                this.currentFrame ++;
                return;
            }

            if (this.state == 'finAttack' || this.state == 'bubble') {

                const arr = this.stateImages[this.state];
                this.playAnimation(arr);

                if (this.currentFrame % arr.length === arr.length - 1) {
                    this.state = 'idle';
                    this.canAct = true;
                }else{
                    this.currentFrame ++;
                }
                return;
            }

            if (this.isHurt()) {
                this.playAnimation(this.stateImages.hurt)
                this.currentFrame ++;
            }

            else {
                this.handleMovementInputs();
                this.playAnimation(this.stateImages.idle);
                if(this.world.keyboard.S && this.canAct){
                    this.state = 'finAttack';
                    this.canAct = false;
                    this.currentFrame = 0;
                }
                if(this.world.keyboard.A && this.canAct && this.world.poisonBar.percentage > 0){
                    this.state = 'bubble';
                    this.canAct = false;
                    this.currentFrame = 0;
                }
                this.currentFrame ++;
            }
        

            if (this.idleCounter >= 600) {
                this.idleTrigger = true;
                this.idleCounter = 0;
            }

            this.idleCounter++;
            this.world.camera_x = -this.x;
            if (this.world.endboss.isDead()) {
                this.stopAnimation();
            }
        }, 1000 / 60);

    }


    handleMovementInputs() {
        this.goRight();
        this.goLeft();
        this.goUp();
        this.goDown();
    }


    goRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            if (this.state == "idle") this.playAnimation(this.IMAGES_SWIM);
        }
    }

    goLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            if (this.state == "idle") this.playAnimation(this.IMAGES_SWIM);
        }
    }
    goUp() {
        if (this.world.keyboard.UP && this.y > -70) {
            this.y -= this.speed;
            if (this.state == "idle") this.playAnimation(this.IMAGES_SWIM);


        }
    }
    
    goDown() {
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y) {
            this.y += this.speed;
            if (this.state == "idle") this.playAnimation(this.IMAGES_SWIM);
        }
    }

    

    /**resets counter on any imput */
    onAnyInput() {
        this.idleCounter = 0;
        this.idleTrigger = false;
    }

    /**clears all intervals */
    stopAnimation() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
        this.animationStarted = false;
    }

}