class Coin extends CollectableObject{
    width = 50;
    height = 50;
    

    constructor(path, x, y){
    super().loadImage(path);
    this.x = x;
    this.y = y;
    }



}