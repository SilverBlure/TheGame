class GameOverScreen extends DrawableObject {

    title;
    canvas

    /**
     * 
     * @param {object} canvas 
     * @param {object} world 
     */
    constructor(canvas , world) {
        super();
        this.canvas = canvas;
        this.title = new DrawableObject();
        this.title.loadImage('assets/6.Botones/Tittles/Game Over/Recurso 11.png');
        this.title.y = 50;
        this.title.width = 360;
        this.title.height = 180;
        this.title.x = (this.canvas.width / 2) - (this.title.width / 2);
        this.flag = false;
        this.world = world;
        this.doc = document.getElementById('buttons');
        this.sound = new Audio('assets/sounds/GameOver.mp3');

    }

    /**
     * draw images on canvas
     * @param {object} ctx 
     */
    draw(ctx) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.title.draw(ctx);
            if (!this.flag) {
                this.flag = true;
            this.try_again_button();
        }
    }

    try_again_button() {
        this.doc.classList.remove('buttons');
        this.doc.classList.add("positionTryAgainBtn");
        this.doc.innerHTML = `<div class="tryAgain">
                                <button  class="startButton" id="button" onclick="game.resetGame()">Try Again</button>
                            </div>`;
    }



}