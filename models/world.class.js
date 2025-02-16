class World {
    ctx;
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    lights = level1.lights;
    backgroundObjects = level1.backgroundObjects;
    world;
    camera_x = 0;
    keyboard;
    statusBar = new StatusBar();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            })
        }, 1000)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.backgroundObjects);

        //--------Space for FixObjects---------//
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToMap(this.lights, 50, 50);
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);

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
