class GameOver extends DrawableObject {

    title;

    canvas

    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.title = new DrawableObject();
        this.title.loadImage('assets/6.Botones/Tittles/Game Over/Recurso 11.png');
        this.title.y = 50;
        this.title.width = 360;
        this.title.height = 180;
        this.title.x = (this.canvas.width / 2) - (this.title.width / 2);
        this.flag = false;

        // this.try_again_button.y = 300;
        // this.try_again_button.width = 160;
        // this.try_again_button.heigth = 80;
        // this.try_again_button.x = this.canvas.width / 2 - this.try_again_button.width /2 ;


        this.doc = document.getElementById('buttons');
    }

    /**draw images on canvas */
    draw(ctx) {

        if (!this.flag) {
            this.flag = true;
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.title.draw(ctx);
            this.try_again_button();
        }
    }

    try_again_button() {
        this.doc.innerHTML = ` <div class="buttons">
        <button  class="startButton" id="button" onclick="game.resetGame()">Try Again</button>
        </div>`;
    }



}