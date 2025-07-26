class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 2850;
    level_end_y = 250;

    /**
     * 
     * @param {object} enemies 
     * @param {object} lights 
     * @param {object} backgroundObjects 
     * @param {object} collectable 
     */
    constructor(enemies, lights, backgroundObjects, collectable ){
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.collectable = collectable
    }
}