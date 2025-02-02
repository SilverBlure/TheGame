class Light extends MovableObject{



    constructor(path,x ,y){
        super().loadImage(path, x, y);
        this.x = x;
        this.y = y;
    }


}