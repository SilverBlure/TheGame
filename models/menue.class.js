class Menue extends DrawableObject {
ctx;
canvas;
mouse;



    constructor(canvas, mouse) {
        super();
        this.loadImage('./assets/3.Menu/1.Start.png');
        this.ctx = canvas.getContext("2d");


        this.draw();


    }
    draw() {
        
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    }
}