class World {
    ctx;
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    lights = level1.lights;
    backgroundObjects = level1.backgroundObjects;
    collectable = [
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Left.png', 100, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Right.png', 400, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Left.png', 700, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Right.png', 1200, 320),
        new PoisonBottle('assets/4. Marcadores/Posión/Dark - Left.png', 2100, 320),
        new Coin('assets/4. Marcadores/1. Coins/1.png', 100, 320),
        new Coin('assets/4. Marcadores/1. Coins/1.png', 550, 320),
        new Coin('assets/4. Marcadores/1. Coins/1.png', 300, 320),
        new Coin('assets/4. Marcadores/1. Coins/1.png', 2200, 320),
        new Coin('assets/4. Marcadores/1. Coins/1.png', 850, 320),
    ];
    world;
    camera_x = 0;
    keyboard;
    mouse;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    state;
    fadeAlpha = 0;
    tryAgainImage = new Image()
    intervalId = [];


    //audioBg = new Audio('assets/sounds/514800__mrthenoronha__water-game-theme-loop-2.wav');


    constructor(canvas, keyboard, mouse, onExit) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.mouse = mouse;
        this.setWorld();
        this.checkCollisions();
        
        //this.playSound();
        this.state = "running";
        this.onExit = onExit;
        this.tryAgainImage.src = 'assets/6.Botones/Try again/Recurso 15.png';
    }

    /* playSound(){    //bg sound
         this.audioBg.play();
         this.audioBg.volume = 0.1;
         this.audioBg.loop = true;
     }*/


    setWorld() {
        this.character.world = this;
    }

    

    checkGameOver() {
        if (this.character.energy <= 0 && this.state !== "dead") {
            this.state = "dead";
            this.startGameOverSequence();
        }
    }

    startGameOverSequence() {
        this.fadeAlpha = 0;

        setTimeout(() => {
            this.onExit();
        }, 3000);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(this.character, enemy) && enemy.isAlive) {  // colliding with Enemy
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);
            }
        })

        this.collectable = this.collectable.filter(collectable => {
            if (this.character.isColliding(this.character, collectable)) {
                //console.log('Kollision erkannt mit:', collectable);
                if (collectable instanceof PoisonBottle) {
                    this.poisonBar.addPoison(20);

                } else if (collectable instanceof Coin) {
                    this.coinBar.addCoin(20);
                }
                //console.log("Objekt entfernt aus Array: ", collectable);
                return false;
            }
            return true;

        });

        this.throwableObjects.forEach((throwableObject) => {
            this.enemies.forEach((enemy) => {
                if (this.character.isCollidingWithTrowable(throwableObject, enemy)) {
                    enemy.hit(10);
                }
            });
        });
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);

        //--------Space for FixObjects---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.collectable);

        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        //FUNCTIONES
        this.checkCollisions();
            this.clearDeadEnemys();
            this.checkGameOver();


        if (this.state === "dead") {
            this.drawGameOverFade();
        }

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    };

    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (o !== null) {
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

    clearDeadEnemys() {

        this.enemies = this.enemies.filter(enemy => {
            if (enemy.isAlive && !enemy.inEndposition) {
                return true;
            }

        })

    }

    drawGameOverFade() {
        console.log("fadeAlpha:", this.fadeAlpha);
    if (this.fadeAlpha < 1) {
        this.fadeAlpha += 0.01;
    }

    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.fadeAlpha >= 0.5) {
        this.ctx.globalAlpha = this.fadeAlpha;
        this.ctx.drawImage(
            this.tryAgainImage,
            this.canvas.width / 2 - 200,
            this.canvas.height / 2 - 100,
            400,
            200
        );
        this.ctx.globalAlpha = 1.0;
        
    }
}

    

}
