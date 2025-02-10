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
        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.lights, 50, 50); 
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
        if(this instanceof Character || this instanceof Enemie){
            drawBorder(mo);
        }
       

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }

    drawBorder(mo){
        this.ctx.beginPath();
        this.ctx.lineWidth = '4';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }
}

