/**
 * Crate an new Background Object
 * @class
 * inhert from MovableObject
 */

class Background extends MovableObject {
    width = 720;
    height = 480;

    /**
     * 
     * @constructor
     * Create a background Object
     * @param {string} imagePath - relativ path of the Image
     * @param {number} x - x coordinate for the Image
     * @param {number} y - y coordinare for the Image
     */
    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;

    }


}