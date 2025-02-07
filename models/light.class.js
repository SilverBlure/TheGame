class Light extends MovableObject {
height= 200;
width = 300;


    constructor(path, x, y) {
        super().loadImage(path, x, y);
        this.x = x;
        this.y = y;
    }


}