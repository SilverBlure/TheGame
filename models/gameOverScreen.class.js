/**
 * @class
 * the gameOver Screen Object
 */
class GameOverScreen extends DrawableObject {

    title;
    canvas

    /**
     * @constructor
     * @param {object} canvas 
     * @param {object} world 
     * extended from DawableObject
     * set canvas
     * set Title
     * load images
     * set diameters
     * set flag to false
     * set doc from html
     * load sound
     */
    constructor(canvas, world) {
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

    }

    /**
     * if the flag is false, the buttons get removed
     * and new buttos get created and classes added
     */
    addTryAgainButton() {
        this.flag = true;
        this.doc.classList.remove('buttons');
        this.doc.classList.add("positionTryAgainBtn");
        this.doc.innerHTML = `<div class="tryAgain">
                                <button  class="startButton" id="button" onclick="game.resetGame()">Try Again</button>
                            </div>`;
    }



}