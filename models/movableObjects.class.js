class MovableObject extends DrawableObject {

    speed = 1.5;
    energy = 100;
    otherDirection = false;
    lastHit = 0;
    speedY = 0;
    acceleration = 2.5;
    moveIntervall = null;
    isAlive = true;


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
        this.moveIntervall = setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    stopMove() {
        clearInterval(this.moveIntervall);
        this.moveIntervall = null;
    }


    playAnimation(imageArr) {
        let i = this.currentImage % imageArr.length;
        let path = imageArr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    //  Variablen: currentImage, path, PararmeterArray, imageCach
    //Die Funktion bokommt ein Array,
    //Das Bild mit der nummer 0 wird aus dem Array genommen 
    //bis das bild an der stelle ist wie das Array lang ist 
    // wird die funktion wiederhohlt 
        
    playAnimationOnce(imageArr){
        let i = this.currentImage % imageArr.length; // 0 = 0/3 // 1/3 Was macht der Modulo Operator
        let path = imageArr[i];                     // das array an stelle i wird nach path gelegt
        this.img = this.imageCach[path];            // img imgCach mit pfad wird aug img gelegt 
        this.currentImage++;                        // currentImage wird um eins erhoeht
     
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



}