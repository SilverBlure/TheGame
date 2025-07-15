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
    state = "idle";
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

    IMAGES_IDLE = [
        'assets/1.Sharkie/1.IDLE/1.png',
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
        'assets/1.Sharkie/1.IDLE/14.png'
    ]

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
        this.loadImages(this.IMAGES_IDLE);
        this.setStates();
        this.action = false;
        this.sound = new Audio('assets/sounds/characterWhip.wav');
        this.animate();
    }


    setStates() {
        this.stateImages = {
            swim: this.IMAGES_SWIM,
            idle: this.IMAGES_IDLE,
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
            console.log(this.state)
            this.move();
            this.hurt();
            if(!this.action){
            this.bubble();
            this.melee(); 
            this.idle();
            this.stateBahavor();
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
        }, 50);
    }


    //die ticks sind noch falsch und die bewegungen werden falsch ausgeführt, warum wird der state auf idle zurrück gesetzt

    stateBahavor(){
        if(this.state == 'hurt'){
            this.playAnimation(this.stateImages.hurt);
        }
        if(this.state == 'idle'){
            this.playAnimation(this.stateImages.idle);
        }
        if(this.state == 'swim'){
            this.playAnimation(this.stateImages.swim);
        }
    }

    handleMovementInputs() {
        this.goRight();
        this.goLeft();
        this.goUp();
        this.goDown();
    }

hurt(){
    if(this.isHurt()){
                this.state = 'hurt';
            }
        }

idle(){
    if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.DOWN && !this.world.keyboard.UP && !this.world.keyboard.A && !this.world.keyboard.S && !this.action){
    this.state = 'idle'
    }
}

move(){
    if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.DOWN || this.world.keyboard.UP){
        this.state = 'swim';
        this.handleMovementInputs();
    }
    }
 



bubble(){
    if(this.world.keyboard.A && !this.action){
        if(this.world.poisonBar.percentage > 10){
        this.action = true;
        this.state = 'bubble';
        this.currentImage = 0;
        if(!this.animated){
        this.playAnimationOnce(this.stateImages.bubble);
        setTimeout(()=>{
            this.addBubble();
            this.action = false;
        },800)
        
    }
    }}
}

melee(){
    if(this.world.keyboard.S){
        this.action = true;
        this.state = 'finAttack';
        this.currentImage = 0;
        if(!this.animated){
        this.playAnimationOnce(this.stateImages.finAttack);
        setTimeout(()=>{
            this.action = false;
        },800)
        }
    }
    }


    goRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false; 
        }
    }

    goLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }

    goUp() {
        if (this.world.keyboard.UP && this.y > -70) {
            this.y -= this.speed;
        }
    }

    goDown() {
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y) {
            this.y += this.speed;
        }
    }

    /**resets counter on any imput */
    onAnyInput() {
        this.idleCounter = 0;
        this.idleTrigger = false;
    }

addBubble(){
    
    this.world.throwableObjects.push(new ThrowableObject(this.x, this.y, this.otherDirection, this.world));
}

addMelee(){
    this.world.meleeAtk.push(new FinAttack(this.x, this.y, this.width, this.height));
}

    /**clears all intervals */
    stopAnimation() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
        this.animationStarted = false;
    }

}