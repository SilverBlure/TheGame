/**
     * function for going Right, with an endpoint on the x-achse
     */
    export function goRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x < 2700) {
            this.x += this.speed;
            this.otherDirection = false;
        }
    }

    /**
     * function for going Left, with an endpoint on the x-achse
     */
    export function goLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }

    /**
     * function for going Up, with an endpoint */

   export function  goUp() {
        if (this.world.keyboard.UP && this.y > -70) {
            this.y -= this.speed;
        }
    }

    /**
     * method for going down, with an endpoint
    */
    export function goDown() {
        if (this.world.keyboard.DOWN && this.y < this.world.level.level_end_y) {
            this.y += this.speed;
        }
    }

     /**
     * pushes a new throwableObject in the world array 
     */
    export function addBubble() {
        this.world.throwableObjects.push(new ThrowableObject(this.x, this.y, this.otherDirection, this.world));
    }

    /**
     * add the Melee attack to the world.meleeAtk Array, runs after 500ms the removeMelee method
     */
    export function addMelee() {
        this.world.meleeAtk.push(new FinAttack(this.x, this.y, this.width, this.height, this.world));
        setTimeout(() => {
            this.removeMelee();
        }, 500)
    }