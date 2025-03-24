class World {
    ctx;
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    lights = level1.lights;
    backgroundObjects = level1.backgroundObjects;
    collectable = [
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Left.png',100, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Right.png',400, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Left.png',700, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Right.png',1200, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Left.png',2100, 320),
        new Coin('assets/4. Marcadores/1. Coins/1.png',100,320),
        new Coin('assets/4. Marcadores/1. Coins/1.png',550,320),
        new Coin('assets/4. Marcadores/1. Coins/1.png',300,320),
        new Coin('assets/4. Marcadores/1. Coins/1.png',2200,320),
        new Coin('assets/4. Marcadores/1. Coins/1.png',850,320),
    ];
    world;
    camera_x = 0;
    keyboard;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    throwableObjects = [new ThrowableObject(),];
    //audioBg = new Audio('assets/sounds/514800__mrthenoronha__water-game-theme-loop-2.wav');

    /**Constructor meithode
     * 
     * @param {ctx} canvas 
     * @param {bool} keyboard 
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.checkCollisions();
        this.run();
        //this.playSound();
    }

    /* playSound(){    //bg sound
         this.audioBg.play();
         this.audioBg.volume = 0.1;
         this.audioBg.loop = true;
     }*/
    /**
     * set The World in the Character Object
     */
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {          //change to requestAnimationFrame()
            this.checkCollisions()
        }, 500)
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(this.character,enemy)) {  // colliding with Enemy
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        })

        this.collectable = this.collectable.filter( collectable =>{
            if (this.character.isColliding(this.character, collectable)) {
                console.log('Kollision erkannt mit:', collectable);
                    if (collectable instanceof PoisonBottle) {
                        this.poisonBar.addPoison(20);

                    } else if (collectable instanceof Coin) {
                        this.coinBar.addCoin(20);
                    }
                console.log("Objekt entfernt aus Array: ", collectable);
                return false;
                }
            return true;

        });

    }


    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.backgroundObjects);

        //--------Space for FixObjects---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.collectable);

        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);

        this.addObjectToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    };

    addObjectToMap(objects) {
        objects.forEach(o => {
            if(o !== null) {
                this.addToMap(o);
            }
        });
    }

    addToMap(mo) {                  // invert images

        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
        
    }
    

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}
