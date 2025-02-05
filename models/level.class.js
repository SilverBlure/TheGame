class Level {
    enemies;
    lights;
    backgroundObjects;
    level_end_x = 2150;
    level_start_y = 0;
    level_end_y = 250;

    constructor(enemies, lights, backgroundObjects){
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
    }
}