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
    intervalIdCollection = [];
    requestAnimationFrameID;
    intervals = [ ];


    //audioBg = new Audio('assets/sounds/514800__mrthenoronha__water-game-theme-loop-2.wav');


    constructor(canvas, keyboard, mouse, onExit) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.mouse = mouse;
        this.setWorld();
        this.loop();
        this.state = "running";
        this.onExit = onExit;
        this.tryAgainImage.src = 'assets/6.Botones/Try again/Recurso 15.png';
    }




    setWorld() {
        this.character.world = this;
    }



    checkGameOver() {
        if (this.character.energy <= 0 && this.state !== "dead") {

            this.state = "dead";
            this.character.cleanUp();
            this.enemies.forEach((enemy) => {
                enemy.cleanUp();
            });
            this.throwableObjects.forEach((throwableObject) => {
                throwableObject.cleanUp();
            });
            this.startGameOverSequence();
        }
    }

    startGameOverSequence() {

        setTimeout(() => {
            this.onExit();
        }, 3000);
    }

    checkCharacterEnemyCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(this.character, enemy) && enemy.isAlive) {
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCharacterCollectablesCollision() {
        this.collectable = this.collectable.filter(obj => {
            if (this.character.isColliding(this.character, obj)) {
                if (obj instanceof PoisonBottle) {
                    this.poisonBar.addPoison(20);
                } else if (obj instanceof Coin) {
                    this.coinBar.addCoin(20);
                }
                return false;
            }
            return true;
        });
    }

    checkProjectileEnemyCollision() {
        this.throwableObjects.forEach(projectile => {
            this.enemies.forEach(enemy => {
                if (this.character.isCollidingWithTrowable(projectile, enemy)) {
                    enemy.hit(10);
                }
            });
        });
    }
    checkIfEnemyRunOut() {
        this.enemies = this.enemies.filter(enemy => {
            return (enemy.x + enemy.width) >= 0;
        })
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
    }


    update() {
        this.checkCharacterEnemyCollision();
        this.checkProjectileEnemyCollision();
        this.checkCharacterCollectablesCollision();
        this.clearDeadEnemys();
        this.checkGameOver();
        this.checkIfEnemyRunOut();
        this.reSpawnEnemie();
        this.stopProjectile();
    }

    reSpawnEnemie() {
        if (this.enemies.length < 6) {
            this.enemies.push(new Pufferfish());
        }
    }

    stopProjectile(){
        this.throwableObjects= this.throwableObjects.filter(obj =>{
                return !obj.outOfRange;
        })
    }

    loop() {
        let now = 0;

        if (now >= 30) {
            this.draw();
        }
        this.update();
        now++;

        let self = this;
        this.requestAnimationFrameID = requestAnimationFrame(() => {
            self.loop();
        });
    }

    cleanUp() {
        cancelAnimationFrame(this.requestAnimationFrameID);
        this.requestAnimationFrameID = null;
    }



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




}
