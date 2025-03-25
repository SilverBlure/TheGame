class CoinBar extends DrawableObject {
    percentage;
    coinBar = [
        'assets/4. Marcadores/green/Coin/0_.png',
        'assets/4. Marcadores/green/Coin/20_.png',
        'assets/4. Marcadores/green/Coin/40_.png',
        'assets/4. Marcadores/green/Coin/60_.png',
        'assets/4. Marcadores/green/Coin/80_.png',
        'assets/4. Marcadores/green/Coin/100_.png',
    ];

    

    constructor() {
        super();
        this.loadImages(this.coinBar);
        this.x = 30;
        this.y = 60;
        this.width = 150;
        this.height = 40;
        this.setPercentage();
        this.percentage = 1;
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.coinBar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    addCoin(value){
        this.percentage = Math.min(100, this.percentage + value);
        this.setPercentage(this.percentage);
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