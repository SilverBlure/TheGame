class World {
    ctx;
    character = new Character(250, 200);
    enemies = level1.enemies;
    lights = level1.lights;
    background = level1.backgroundObjects;
    world;
    camera_x = 0;
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.draw();
        this.keyboard = keyboard;
        this.setWorld();
    }

    setWorld(){
        this.character.world= this;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.background);
        //this.addObjectToMap(this.lights); 
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    };

    addObjectToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        // invert images
        if(mo.otherDirection){
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    };
}