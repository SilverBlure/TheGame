/**
 * @class
 * class of the poison bar
 */
class PoisonBar extends DrawableObject {

    percentage;
    poisonBar = [
        'assets/4.Marcadores/green/poisonedBubbles/0_.png',
        'assets/4.Marcadores/green/poisonedBubbles/20_.png',
        'assets/4.Marcadores/green/poisonedBubbles/40_.png',
        'assets/4.Marcadores/green/poisonedBubbles/60_.png',
        'assets/4.Marcadores/green/poisonedBubbles/80_.png',
        'assets/4.Marcadores/green/poisonedBubbles/100_.png',
    ];


    /**
     * @constructor
     * extends from DrawableObject
     * load images
     * set diameters
     * call setPercentage with 0
     */
    constructor() {
        super();
        this.loadImages(this.poisonBar);
        this.x = 30;
        this.y = 30;
        this.width = 150;
        this.height = 40;
        this.setPercentage(0);
        
        
    }

    /**
     * set Persentage 
     * @param {number} percentage 
     */   
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.poisonBar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * decreases the PoisonBar
     * @param {number} value 
     */
    decreasePoisonBar(value){
        this.percentage = this.percentage - value;
        this.setPercentage(this.percentage);
    }

    /**
     * addPoison 
     * @param {number} amount 
     */
    addPoison(amount){
        this.percentage = Math.min(100, this.percentage + amount);
        this.setPercentage(this.percentage);
    }

    /**image controller 
     * returns number of the right image
    */
    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if(this.percentage > 80){
            return 4;
        }else if(this.percentage > 60){
            return 3;
        }else if(this.percentage > 40){
            return 2;
        }else if(this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }

    
}