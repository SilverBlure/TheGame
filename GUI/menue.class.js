class Menue {
    ctx;
    mouse;
    menueBG = new MenueBackground();
    startButton = new Startgame();
    fullScreen = new Fullscreen();
    loadWorld;
    originalWidth;
    originalHeight;
    fullwindow = false;
    requestAnimationFrameID;

    constructor(canvas, mouse, loadWorld) {
        this.ctx = canvas.getContext("2d");
        this.mouse = mouse;
        this.onStart = loadWorld;
        this.draw();
        this.canvas = canvas;
    }

    collisionWithButton(button) {
        if (this.mouse.pos_x > button.x && this.mouse.pos_x < button.x + button.width &&
            this.mouse.pos_y > button.y && this.mouse.pos_y < button.y + button.height) { 
            return true;
        }
        return false;
    }

    hoverPointer(){
        
            if (this.collisionWithButton(this.startButton) || this.collisionWithButton(this.fullScreen)) {
                document.body.style.cursor = "pointer";
            } else {
                document.body.style.cursor = "default";
            }
            }

            checkMousePosition(){
                if (this.collisionWithButton(this.startButton) && this.mouse.click && !this.mouse.block) {
                    this.mouse.block = true; // 🧠 BLOCK CLICK AFTER FIRST
                    this.onStart(); // <- ruft `loadWorld()` im GameController
                }
            }

    setReframe() {
         //original size

        if(this.fullwindow){ //true
            this.canvas.width = this.originalWidth;
            this.canvas.height = this.originalHeight;
            this.fullwindow = false;
            }
        else{
        this.originalWidth = this.canvas.width;
        this.originalHeight = this.canvas.height;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight; 
        this.fullwindow = true;

        }  
        this.startButton = new Startgame(this.canvas.width, this.canvas.height);
        this.menueBG = new MenueBackground(this.canvas.width, this.canvas.height);
        this.fullScreen = new Fullscreen(this.canvas.width, this.canvas.height); 
    }
    toggleFullscreen()
    {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
   

    draw() {
        this.addToMap(this.menueBG);
        this.addToMap(this.startButton);
        this.addToMap(this.fullScreen);
        this.checkMousePosition();
        this.hoverPointer();

        let self = this;
       this.requestAnimationFrameID = requestAnimationFrame(() => {
            self.draw();
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
}