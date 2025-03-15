class Button extends DrawableObject{
    x;
    y;
    height;
    width;
    ImgSrc;
    
    constructor(x, y, height, width, imagePath){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.src = imgSrc;

    }
}