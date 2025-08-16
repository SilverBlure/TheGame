/**
 * @class
 * inhert form DrawableObject
 */
class CollectableObject extends DrawableObject {
    value = 0;

    /**
     *  @constructor
     * @param {string} name -  name of the object
     * @param {number} position - position of the collectable objects
    */
    constructor(name, position) {
        super();
        this.name = name;
        this.position = position;
    }

    /**
     * increase value 
     */
    increase() {
        return this.value += 1;
    }
    /**
     * decrease value 
     * */
    decrease() {
        return this.value -= 1;
    }
}