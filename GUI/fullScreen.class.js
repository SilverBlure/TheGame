class Fullscreen extends DrawableObject{
height = 80;
width = 200;
x = canvas.width / 2 - this.width / 2;
y = 200;
    
FULLSCREEN_IMG = ['assets/6.Botones/Full Screen/Mesa de trabajo 6.png',
    'assets/6.Botones/Full Screen/Mesa de trabajo 7.png',
    'assets/6.Botones/Full Screen/Mesa de trabajo 8.png',
    'assets/6.Botones/Full Screen/Mesa de trabajo 9.png'];


    constructor(){
        super();
        this.loadImages(this.FULLSCREEN_IMG);
        this.loadImage(this.FULLSCREEN_IMG[0]); // <- dieses Bild wird sichtbar verwendet
    }





}