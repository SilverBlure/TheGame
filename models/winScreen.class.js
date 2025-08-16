class WinScreen extends MovableObject {


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


addTryAgainButton(){

        this.flag = true;
        this.doc.classList.remove('buttons');
        this.doc.classList.add("positionTryAgainBtn");
        this.doc.innerHTML = `<div class="tryAgain">
                                <button  class="startButton" id="button" onclick="game.resetGame()">Try Again</button>
                            </div>`;
    }



}