class World {
    ctx;
    character = new Character();
    enemies = [
        new Enemie(),
        new Enemie(),
        new Enemie(),
    ];

    background = [
        new Background('./../assets/3.Background/Dark/1.png', 0, 0)
    ];

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.addObjectToMap(this.background);

        this.addToMap(this.character);
       
        this.addObjectToMap(this.enemies);


        let self = this;
        requestAnimationFrame(function () {
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