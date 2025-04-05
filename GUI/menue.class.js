class Menue {
    ctx;
    mouse;
    menueBG = new MenueBackground();
    startButton = new Startgame();
    fullScreen = new Fullscreen();


    constructor(canvas, mouse) {
        this.ctx = canvas.getContext("2d");
        this.mouse = mouse;
        this.draw();
        this.run();


    }

    collisionWithStartButton() {
        if (this.mouse.x > this.startButton.x && this.mouse.x < this.startButton.x + this.startButton.width &&
            this.mouse.y > this.startButton.y && this.mouse.y < this.startButton.y + this.startButton.height) {
            return true;
        }
        return false;
    }
    checkMouseClick(){
        if(this.collisionWithStartButton() && this.mouse.click){
            
        }
    }
    run(){
        this.checkMouseClick();
        requestAnimationFrame(() => {
            this.run();
        });
    }

    draw() {
        this.addToMap(this.menueBG);
        this.addToMap(this.startButton);
        this.addToMap(this.fullScreen);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
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
}