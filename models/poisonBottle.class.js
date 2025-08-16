class PoisonBottle extends CollectableObject{

    width = 100;
    height = 100;
    
/**
 * 
 * @param {string} path 
 * @param {number} x 
 * @param {number} y 
 */
    constructor(path, x, y){
        super().loadImage(path)
        this.x = x;
        this.y = y;
        this.sound = new Audio("assets/sounds/glassCollection.wav");

    }

}