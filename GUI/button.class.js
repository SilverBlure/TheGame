class Button extends DrawableObject{
height;
width;
x;
y;
    constructor(start, fullScreen) {
        super();
        this.start = start;
        this.fullScreen = fullScreen;
        this.loadImage(this.start);
        this.loadImage(this.fullScreen);
       
    }
}