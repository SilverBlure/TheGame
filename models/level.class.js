class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 2850;
    level_end_y = 250;

    constructor(enemies, lights, backgroundObjects, collectable ){
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
        this.collectable = collectable
    }
}