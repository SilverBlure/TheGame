class FinAttack extends MovableObject{


//peitschengerausch
x;
y;
pos_x;
pos_y;
char_with;
char_height;




constructor(x, y, char_width, char_height) {
    super();
    this.pos_x = x;
    this.pos_y = y;
    this.char_width = char_width;
    this.char_height = char_height;
    this.x = x + char_width; // Position direkt rechts vom Charakter
    this.y = y;              // Gleiche y-Position wie der Charakter
    this.width = 100;         // Länge der Hitbox nach rechts
    this.height = char_height; // gleiche Höhe wie der Charakter
}

    /**collider of the fin attack */
    getCollider() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    
    



    
}