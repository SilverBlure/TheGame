/**
 * @class
 * class for the start game Button
 */
class Startgame extends DrawableObject {
height = 80;
width = 200 ;
x = canvas.width / 2 - this.width / 2;
y = 50;

STARTGAME_IMG = ['assets/6.Botones/Start/1.png',
        'assets/6.Botones/Start/2.png',
        'assets/6.Botones/Start/3.png',
        'assets/6.Botones/Start/4.png',
    ]

/**
 * @constructor
 * @param {number} width 
 * @param {number} height 
 * extends from drawable objects
 * loads buttons
 * set the params with the canvas
 */
    constructor(width, height){
        super();
        this.loadImages(this.STARTGAME_IMG);
        this.loadImage(this.STARTGAME_IMG[0]); // <- dieses Bild wird sichtbar verwendet
        width = this.width;
        height = this.height;
    }
}
