class World {
    ctx;
    character = new Character();
    enemies = [
        new Enemie(),
        new Enemie(),
        new Enemie(),
    ]
    cloud = new Cloud();

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.drawImage(this.cloud.img, this.cloud.x, this.cloud.y, this.cloud.width, this.cloud.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemie => {
            this.ctx.drawImage(enemie.img, enemie.x, enemie.y, enemie.width, enemie.height)
        });



        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}