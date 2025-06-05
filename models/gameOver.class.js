class GameOver extends DrawableObject{

title;
try_again_button;
canvas

    constructor(canvas){
    super();
    this.canvas = canvas;
    this.title= new DrawableObject();
    this.title.loadImage('assets/6.Botones/Tittles/Game Over/Recurso 11.png');
    this.title.y = 50;
    this.title.width = 360;
    this.title.height = 180;
    this.title.x = (this.canvas.width / 2) - (this.title.width / 2);
    this.try_again_button = new DrawableObject();
    this.try_again_button.loadImage('assets/6.Botones/Try again/Recurso 16.png');
    this.try_again_button.y = 300;
    this.try_again_button.width = 160;
    this.try_again_button.heigth = 80;
    this.try_again_button.x = this.canvas.width / 2 - this.try_again_button.width /2 ;

    }

    draw(ctx){
        this.title.draw(ctx);
        this.try_again_button.draw(ctx);
    }


    restart(){
        game.world.state = 'game';
    }



}