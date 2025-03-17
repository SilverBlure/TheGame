class CollectableObject extends DrawableObject{
    value = 0;

    constructor(name, position){
        super();
        this.name = name;
        this.position = position;
    }

    collect(character){
        console.log(`${character}, hebt Item: ${this.name}, an Position: ${this.position} auf!` );
    }

    increase(){
        return this.value += 1;
    }

    decrease(){
       return this.value -= 1;
    }
}