class MovableObject{

    x = 120;
    y = 220;
    img;
    height = 100;
    width = 100;
    imageCach = {};
    currentImage = 0;
    speed = 1.5;
    otherDirection = false;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){

        if(this instanceof Character || this instanceof Enemie || this instanceof Endboss){ //asks if it is a Instance of Character, Enemie or Endboss
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height); // set the frame arround the image, for better colider
        ctx.stroke();
        }
      
    }

    loadImages(arr){
        arr.forEach((path)=> {
            let img = new Image();
            img.src = path;
            this.imageCach[path] = img;
        });
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60);
    }

    playAnimation(imageArr){
        let i = this.currentImage % imageArr.length;
                let path = imageArr[i];
                this.img = this.imageCach[path];
                this.currentImage++;
    }

    



}