/**
 * @class
 * */class Coin extends CollectableObject{
    width = 50;
    height = 50;
    
/**
 * @constructor
 * @param {string} path - the relative path for the Image
 * @param {number} x - x coordinate for the canvas
 * @param {number} y - y coordinate for the canvas
 */
    constructor(path, x, y){
    super().loadImage(path);
    this.x = x;
    this.y = y;
    this.sound = new Audio("assets/sounds/coinCollection.wav");
    }



}