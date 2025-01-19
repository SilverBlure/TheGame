class World {
    ctx;
    character = new Character();
    enemies = [
        new Enemie(),
        new Enemie(),
        new Enemie(),
    ]

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.draw();
    }


    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemie =>{this.ctx.drawImage(enemie.img, enemie.x, enemie.y, enemie.width, enemie.height)
        });
    }
}