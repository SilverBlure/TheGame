class MovableObject extends DrawableObject {

    speed = 1.5;
    energy = 100;
    otherDirection = false;
    lastHit = 0;
    speedY = 0;
    acceleration = 2.5;
    moveIntervall = null;
    isAlive = true;
    animationeDone = false;
    intervals = [];


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {  // Trowable object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    //isColliding(chicken);
    isColliding(character, mo) {

        let collider = character.getCollider();
        return collider.x + collider.width > mo.x &&
            collider.y + collider.height > mo.y &&
            collider.x < mo.x &&
            collider.y < mo.y + mo.height;
    }

    isCollidingWithTrowable(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }


    moveLeft() {
        this.intervals.push(setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60));
    }

    stopMove(){
        
    }


    playAnimation(imageArr) {

        let i = this.currentImage % imageArr.length;
        let path = imageArr[i];
        this.img = this.imageCache[path];
        this.currentImage++;

    }

     playAnimationOnce(imageArr) {
        if (this.animationeDone || this.currentImage >= imageArr.length) return;
    
        let path = imageArr[this.currentImage];
        let img = this.imageCache[path];
    
        if (img) {
            this.img = img;
            this.currentImage++;
        } else {
            console.warn("Bild nicht gefunden:", path);
        }
    
        if (this.currentImage >= imageArr.length) {
            this.animationeDone = true;
        }
    }

    

    hit(value) {
        this.energy -= value;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1.5;
    }

    isDead() {
        return this.energy == 0;
    }
    cleanUp() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }



}