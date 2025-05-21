class Light extends MovableObject {

height= 500;
width = 400;

    constructor(path, x, y) {
        super().loadImage(path, x, y);
        this.x = x;
        this.y = y;

        this.speed = 0.15 + Math.random() * 0.15;
        this.moveLeft()
    }
}