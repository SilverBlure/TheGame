/**
 * @class
 * add light objects to map
 */
class Light extends MovableObject {

height= 500;
width = 400;

/**
 * @constructor
 * @param {string} path 
 * @param {number} x 
 * @param {number} y 
 * load images
 * set diameter
 * set speed random
 * call moveLeft() func
 */
    constructor(path, x, y) {
        super().loadImage(path, x, y);
        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.15;
        this.moveLeft()
    }
}