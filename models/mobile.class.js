class MobileController extends DrawableObject{

PAUSE_BUTTON;
D_PAD;
A_BUTTON;


    constructor(){
        super();
        this.PAUSE_BUTTON = new DrawableObject();
        this.PAUSE_BUTTON.loadImage('GUI/Pause.png');
        this.PAUSE_BUTTON.x = 550;
        this.PAUSE_BUTTON.y = 10;
        this.PAUSE_BUTTON.width = 80;
        this.PAUSE_BUTTON.height = 80;

        this.D_PAD = new DrawableObject();
        this.D_PAD.loadImage('GUI/D_pad.png');
        this.D_PAD.x = 30;
        this.D_PAD.y = 230;
        this.D_PAD.width = 140;
        this.D_PAD.height = 140;
      
        this.A_BUTTON = new DrawableObject();
        this.A_BUTTON.loadImage('GUI/A_Button.svg');
        this.A_BUTTON.x = 520;
        this.A_BUTTON.y = 240;
        this.A_BUTTON.width = 120;
        this.A_BUTTON.height = 120;
    }


    draw(ctx) {
        this.PAUSE_BUTTON.draw(ctx);
        this.A_BUTTON.draw(ctx);
        this.D_PAD.draw(ctx);
        
    }
}
