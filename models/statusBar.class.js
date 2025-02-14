class StatusBar extends DrawableObject {

    percent = 100;



    healthBar = [
        'assets/4. Marcadores/green/Life/100_ copia 3.png',
        'assets/4. Marcadores/green/Life/80_  copia 4.png',
        'assets/4. Marcadores/green/Life/60_  copia 3.png',
        'assets/4. Marcadores/green/Life/40_  copia 3.png',
        'assets/4. Marcadores/green/Life/20_ copia 3.png',
        'assets/4. Marcadores/green/Life/0_  copia 2.png',
    ]

    constructor() {

    }

    setPercentage(){
        if(percent = 100){
            return 0;
        }else if(percent = 80){
            return 1;
        }else if(percent = 60){
            return 2;
        }else if(percent = 40){
            return 3;
        }else if(percent = 20){
            return 4;
        } else {
            return 5;
        }
    }
}