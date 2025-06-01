class Fullscreen extends DrawableObject {
    height = 80;
    width = 200;
    x = canvas.width / 2 - this.width / 2;
    y = 200;

    Menue_FULLSCREEN_IMG = ['assets/6.Botones/Full Screen/Mesa de trabajo 6.png',
        'assets/6.Botones/Full Screen/Mesa de trabajo 7.png',
        'assets/6.Botones/Full Screen/Mesa de trabajo 8.png',
        'assets/6.Botones/Full Screen/Mesa de trabajo 9.png'];

    World_FULLSCREEN_IMG = ['GUI/ClosefullscreenInGame.svg',
        'GUI/ClosefullscreenInGame.svg']

    constructor(canvas) {
        super();
        this.loadImages(this.Menue_FULLSCREEN_IMG);
        this.loadImage(this.Menue_FULLSCREEN_IMG[0]); // <- dieses Bild wird sichtbar verwendet
        this.loadImages(this.World_FULLSCREEN_IMG);
        this.loadImage(this.World_FULLSCREEN_IMG[0]);
        this.canvas = canvas;
    }

    checkMode(state) {
        if (state === "menue") {
            this.img = this.imageCache[this.Menue_FULLSCREEN_IMG[0]];
           this.height = 80;
            this.width = 200;
            this.x = canvas.width / 2 - this.width / 2;
            this.y = 200;
        } else if (state === "game") {
            if (document.fullscreen) {
                this.img = this.imageCache[this.World_FULLSCREEN_IMG[0]];
            } else {
                this.img = this.imageCache[this.World_FULLSCREEN_IMG[1]];
            }
            this.height = 80;
            this.width = 80;
            this.x = this.canvas.width - 100;
            this.y = this.canvas.height - 100;
        }
    }

    



}