class CoinBar extends DrawableObject {

    coinBar = [
        'assets/4. Marcadores/green/Coin/0_.png',
        'assets/4. Marcadores/green/Coin/20_.png',
        'assets/4. Marcadores/green/Coin/40_.png',
        'assets/4. Marcadores/green/Coin/60_.png',
        'assets/4. Marcadores/green/Coin/80_.png',
        'assets/4. Marcadores/green/Coin/100_.png',
    ];

    percentage = 0;

    constructor() {
        super();
        
        this.loadImages(this.coinBar);
        this.x = 30;
        this.y = 60;
        this.width = 150;
        this.height = 40;
        this.setPercentage();
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.coinBar[this.resolveImageIndex()];
        //console.log(path);
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