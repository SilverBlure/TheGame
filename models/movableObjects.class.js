class MovableObject extends DrawableObject{

   
    imageCach = {};
    currentImage = 0;
    speed = 1.5;
    energy = 100;
    otherDirection = false;
    lastHit = 0;

   


    //isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    drawFrame(ctx) {~
        if (this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) { //asks if it is a Instance of Character, Enemie or Endboss
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height); // set the frame arround the image, for better colider
            ctx.stroke();
        }

    }

   


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(imageArr) {
        let i = this.currentImage % imageArr.length;
        let path = imageArr[i];
        this.img = this.imageCach[path];
        this.currentImage++;
    }


    hit(){
        this.energy -= 5;

        if(this.energy < 0){
            this.energy =0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() -this.lastHit; // Difference in ms
        timepassed = timepassed/1000; //Difference in s
        return timepassed < 1.5;
    }

    isDead(){
        return this.energy == 0;
    }

}