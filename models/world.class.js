class World {
    ctx;
    character = new Character(250, 200);
    enemies = [
        new Enemie(),
        new Enemie(),
        new Enemie(),
    ];

    lights = [
        new Light('assets/3.Background/Layers/1. Light/1.png',0 ,0),
    ]

    background = [
        //new Background('assets/3.Background/Layers/1. Light/2.png', 0, 0),    must fix the light width and hight
        new Background('assets/3.Background/Layers/5. Water/D2.png', 0, 0),
        new Background('assets/3.Background/Layers/4.Fondo 2/D2.png', 0, 0),
        new Background('assets/3.Background/Layers/3.Fondo 1/D2.png', 0, 0),
        new Background('assets/3.Background/Layers/2. Floor/D2.png', 0, 0),
    ];

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.draw();
        
    }


    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.addObjectToMap(this.background);
        this.addObjectToMap(this.lights);; 
        this.addToMap(this.character);
        this.addObjectToMap(this.enemies);
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    };

    addObjectToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    };
}