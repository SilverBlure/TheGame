class MenueBackground extends DrawableObject{
width = canvas.width;
height = canvas.height;
x = 0;
y = 0;



    MENUE_BACKGROUND = ['assets/3.Background/Mesa de trabajo 1.png',
    ]
    
constructor(width, height){
    super();
    this.loadImages(this.MENUE_BACKGROUND);
    this.loadImage(this.MENUE_BACKGROUND[0]); // <- dieses Bild wird sichtbar verwendet
    width = this.width;
    height = this.height;
}



}