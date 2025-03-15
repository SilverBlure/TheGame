class World {
    ctx;
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    lights = level1.lights;
    backgroundObjects = level1.backgroundObjects;
    poisonBottles = level1.poisonBottles;
    coins = level1.coins
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

    run(){
        setInterval(() =>{
            this.checkCollisions()
        }, 200)
    }

    checkCollisions(){
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            })
            /*
            this.level.collectables.forEach((collectable) =>
                if(this.character.isColliding(collectable)){
            this.character.addcolectable coin or poison
            this.coin or this.poison disable})
            */
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
        this.addObjectToMap(this.poisonBottles);
        this.addObjectToMap(this.coins);
         this.addObjectToMap(this.lights, 50, 50);
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
            this.addToMap(o);
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


    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}
