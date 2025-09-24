/**
 * @class
 * an level object that takes from level1.js
 */
class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 2850;
    level_end_y = 250;

    /**
     * @constructor
     * @param {object} enemies 
     * @param {object} lights 
     * @param {object} backgroundObjects 
     * @param {object} collectable 
     * set enemies
     * set lights
     * set backgroundObjects
     * set collectables
     */
    constructor(enemies, lights, backgroundObjects, collectable ){
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.collectable = collectable
    }
}