class DrawableObject{
    
    x = 120;
    y = 220;
    img;
    height = 100;
    width = 100;
    currentImage = 0;
    imageCache = {};
    mode = "Dev";
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this.mode === 'Dev'){
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Jellyfish || this instanceof FinAttack
        ) { //asks if it is a Instance of Character, Enemie or Endboss
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            if (this instanceof Character){
                let collider = this.getCollider();
                ctx.rect(collider.x, collider.y, collider.width, collider.height); // set the frame nearer to character
                ctx.strokeStyle= "red";
                ctx.lineWidth = "4";
                ctx.stroke();
            }else {
            ctx.rect(this.x, this.y, this.width, this.height); // set the frame arround the image, for better colider
        }
            ctx.stroke();
        }
    }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


} 