class StatusBar extends DrawableObject {

    healthBar = [
        'assets/4.Marcadores/green/Life/0_.png',
        'assets/4.Marcadores/green/Life/20_.png',
        'assets/4.Marcadores/green/Life/40_.png',
        'assets/4.Marcadores/green/Life/60_.png',
        'assets/4.Marcadores/green/Life/80_.png',
        'assets/4.Marcadores/green/Life/100_.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.healthBar);
        this.x = 30;
        this.y = 0;
        this.width = 150;
        this.height = 40;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.healthBar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


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