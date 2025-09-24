/**
 * @class
 * an melee object that get added when sharky makes the tailwip
 */
class FinAttack extends MovableObject{

x;
y;
pos_x;
pos_y;
char_with;
char_height;

/**
 * @constructor
 * @param {number} x 
 * @param {number} y 
 * @param {number} char_width 
 * @param {number} char_height 
 * extended from MovableObjects
 * set diameters
 * set position
 */
constructor(x, y, char_width, char_height, ) {
    super();
    this.loadImage('assets/6.Botones/leerbild.png');
    this.pos_x = x;
    this.pos_y = y;
    this.x = x + char_width;  // Position direkt rechts vom Charakter
    this.y = y;              // Gleiche y-Position wie der Charakter
    this.width = 100;         // Länge der Hitbox nach rechts
    this.height = char_height; // gleiche Höhe wie der Charakter
}

    /**
     * 
     * @returns colider from the tail attack
     */
    getCollider() {
        return {
            x: this.x - 50,
            y: this.y + 100,
            width: 50,
            height: 50,
        };
    }

    
}