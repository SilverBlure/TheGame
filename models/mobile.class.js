class MobileController extends DrawableObject{

D_PAD;
A_BUTTON;
MELEE_BUTTON;


    constructor(canvas){
        super();

        this.canvas = canvas;
       
        this.D_PAD = new DrawableObject();
        this.D_PAD.loadImage('GUI/D_pad.png');
        this.D_PAD.width = 140;
        this.D_PAD.height = 140; 
        this.D_PAD.x = +20;
        this.D_PAD.y = this.canvas.height - 20 - this.D_PAD.height;
      
        this.A_BUTTON = new DrawableObject();
        this.A_BUTTON.loadImage('GUI/A_Button.svg');
        this.A_BUTTON.width = 120;
        this.A_BUTTON.height = 120;
        this.A_BUTTON.x = this.canvas.width - this.A_BUTTON.width - 20;
        this.A_BUTTON.y = this.canvas.height -this.A_BUTTON.height - 120;

        this.MELEE_BUTTON = new DrawableObject();
        this.MELEE_BUTTON.loadImage('GUI/melee.png');
        this.MELEE_BUTTON.width = 120;
        this.MELEE_BUTTON.height = 120;
        this.MELEE_BUTTON.x = this.canvas.width - this.MELEE_BUTTON.width - 120;
        this.MELEE_BUTTON.y = this.canvas.height - 20 - this.MELEE_BUTTON.height;
    }

/**
 * drawing the button on screen
 * @param {string} ctx 
 */
    draw(ctx) {
        this.A_BUTTON.draw(ctx);
        this.D_PAD.draw(ctx);
        this.MELEE_BUTTON.draw(ctx);
        
    }

/**collision detction */
    isTouching(button, x, y) {
        return x > button.x && x < button.x + button.width &&
               y > button.y && y < button.y + button.height;
      }

}
