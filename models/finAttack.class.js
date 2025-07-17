class FinAttack extends MovableObject{

x;
y;
pos_x;
pos_y;
char_with;
char_height;

constructor(x, y, char_width, char_height) {
    super();
    this.loadImage('assets/3.Background/Mesa de trabajo 1.png');
    this.pos_x = x;
    this.pos_y = y;
    
    this.x = x + char_width;  // Position direkt rechts vom Charakter
    this.y = y;              // Gleiche y-Position wie der Charakter
    this.width = 100;         // Länge der Hitbox nach rechts
    this.height = char_height; // gleiche Höhe wie der Charakter
    console.log('finAttack');
   
}

    /**collider of the fin attack */
    getCollider() {
        return {
            x: this.x - 50,
            y: this.y + 100,
            width: 50,
            height: 50,
        };
    }

    
    



    
}