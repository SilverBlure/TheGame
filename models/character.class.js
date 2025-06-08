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
        this.sound = new Audio('assets/sounds/characterWhip.wav');
        this.animate();
    }

    setWorld(world) {
        this.world = world;
    }

    getCollider() {
        return {
            x: this.otherDirection ? this.x - 0 + 50 : this.x + 50,
            y: this.y + 100,
            width: this.width - 100,
            height: this.height - 150
        };
    }

    animate() {
        if (this.animationStarted) return;
        this.animationStarted = true;
        const interval = setInterval(() => {
            if (!this.isDead() ) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.x += this.speed;
                    this.otherDirection = false;
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.x -= this.speed;
                    this.otherDirection = true;

                }
                if (this.world.keyboard.UP && this.y > -70) {
                    this.y -= this.speed;
                }
                if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y) {
                    this.y += this.speed;

                }
                if (this.world.keyboard.S && this.canAct) {
                    this.world.meleeAtk.push(new FinAttack(this.world.character.x,
                        this.world.character.y,
                        this.world.character.width,
                        this.world.character.height));
                    this.playAnimationOnce(this.FIN_MELEE_HIT);

                    if (this.world.sound.state) {
                        this.sound.play();
                    }
                    this.canAct = false;
                    setTimeout(() => {
                        this.world.meleeAtk.pop();
                        this.canAct = true;
                    }, 1500);
                }
                if (this.world.keyboard.A && this.canAct && this.world.poisonBar.percentage > 0) {
                    this.playAnimationOnce(this.IMAGES_ATTACK_BUBBLE_ANIMATION);
                    this.world.poisonBar.setPercentage(this.world.poisonBar.percentage - 10);
                    this.world.throwableObjects.push(new ThrowableObject(this.world.character.x, this.world.character.y, this.otherDirection, this.world));
                    this.canAct = false;
                    setTimeout(() => {
                        this.canAct = true;
                    }, 500);
                }
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




        const interval2 = setInterval(() => {
            this.frameCounter++;
            if (this.world.endboss.isDead()) {
                if (this.world.sound.state) {
                    let sound = new Audio('assets/sounds/GameOver.mp3');
                    sound.play();
                    this.stopAnimation();
                }
                this.playAnimationOnce(this.IMAGES_DEAD_POISON);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_POISON);
                if (!this.hurthasPlayed) {
                    this.hurthasPlayed = true;

                    if (this.world.sound.state) {
                        let sound = new Audio('assets/sounds/playerHurt.mp3');

                        sound.play();
                        setTimeout(() => {
                            this.hurthasPlayed = false;
                        }, 1000);
                    }

                }
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.DOWN || this.world.keyboard.UP) {
                this.playAnimation(this.IMAGES_SWIM);
            } else if (this.idleTrigger) {
                if (this.frameCounter % 3 == 0) {
                    this.playAnimation(this.IMAGES_IDLE_SLEEP);
                }
            }
            if (this.frameCounter > 10000) {
                this.frameCounter = 0;
            }
        }, 50);
        this.intervals.push(interval, interval2)
    }

    onAnyInput() {
        this.idleCounter = 0;
        this.idleTrigger = false;
    }

    stopAnimation() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
        this.animationStarted = false;
    }

}