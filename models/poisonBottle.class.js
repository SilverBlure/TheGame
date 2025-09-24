/**
 * @class
 * class of the poisonbottle
 */
class PoisonBottle extends CollectableObject{

    width = 100;
    height = 100;
    
/**
 * @constructor
 * 
 * @param {string} path 
 * @param {number} x 
 * @param {number} y 
 * extends from collectableObjects
 * load images
 * load sound
 */
    constructor(path, x, y){
        super();
        this.loadImage(path)
        this.x = x;
        this.y = y;
        this.sound = new Audio("assets/sounds/glassCollection.wav");

    }

}