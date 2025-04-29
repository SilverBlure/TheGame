class FinAttack extends MovableObject{


//peitschengerausch
x;
y;
pos_x;
pos_y;
char_with;
char_height;




    constructor(character){
        super();
        this.loadImages(this.FIN_MELEE_HIT);
        this.pos_x = character.x;
        this.pos_y = character.y;
        this.char_width = character.width;
        this.char_height = character.height;
        this.x = character.x + character.width;
        this.y = character.y;
        this.width = 40;
        this.height = character.height;
        
    }

    getCollider(){
        return (this.x +this.width &&
            this.y + this.height)
    }




    
}