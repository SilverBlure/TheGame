class World {
    ctx;
    character = new Character();
    enemie = [
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
    }
}