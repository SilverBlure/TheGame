/**
 * @class
 * class for the winning screen 
 */
class WinScreen extends MovableObject {

/**
 * 
 * @param {object} canvas 
 * extends MovableObjects
 * load diameters
 * load images
 * load html buttones
 * set flag to false
 * set new audio
 */
constructor(canvas){
    super();
    this.canvas = canvas;
    this.loadImage("assets/6.Botones/Tittles/You win/Mesa de trabajo 1.png");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.x = 0;
    this.y = 0;
    this.flag = false;
    this.doc = document.getElementById('buttons');
    this.sound = new Audio('assets/sounds/win.wav')

   
}

/**
 * if the flag is false, the buttons get removed
 * and new buttos get created and classes added
 */
addTryAgainButton(){
        this.flag = true;
        this.doc.classList.remove('buttons');
        this.doc.innerHTML += `
                                <button  class="startButton" id="button" onclick="game.resetGame()">Try Again</button>
                            `;
    }



}