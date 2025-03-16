class PoisonBottle extends CollectableObject{

    width = 100;
    height = 100;
    

    constructor(path, x, y){
        super().loadImage(path)
        this.x = x;
        this.y = y;

    }
}