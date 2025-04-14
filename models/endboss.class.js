class Endboss extends MovableObject {
    height = 300;
    width = 300;
    x = 150;
    y = -300;
    interval;
    isAlive = true;
    energy = 20;


    ENDBOSS_STAY = [
        'assets/2.Enemy/3 Final Enemy/2.floating/1.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/2.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/3.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/4.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/5.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/6.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/7.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/8.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/9.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/10.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/11.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/12.png',
        'assets/2.Enemy/3 Final Enemy/2.floating/13.png',
    ]

    ENDBOSS_INTRODUCE = ['assets/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'assets/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ]

    ENDBOSS_DEAD = [
        'assets/2.Enemy/3 Final Enemy/Dead/1.png',
        'assets/2.Enemy/3 Final Enemy/Dead/2.png',
        'assets/2.Enemy/3 Final Enemy/Dead/3.png',
        'assets/2.Enemy/3 Final Enemy/Dead/4.png',
        'assets/2.Enemy/3 Final Enemy/Dead/5.png',
        'assets/2.Enemy/3 Final Enemy/Dead/6.png',
    ]



    constructor() {
        super();
        this.loadImage(this.ENDBOSS_STAY[0]);
        this.world = null;
        this.x = 2550;
        this.loadImages(this.ENDBOSS_STAY);
        this.loadImages(this.ENDBOSS_INTRODUCE);
        this.loadImages(this.ENDBOSS_DEAD);

    }


    animate() {
        const interval = setInterval(() => {
            this.playAnimation(this.ENDBOSS_STAY);
        }, 800);
    
        this.world?.intervalIdCollection.push(interval); // für CleanUp
    }
    

    animateIntro() {
        let i = 0;
        this.y = 0;

        const interval = setInterval(() => {
            this.img = this.imageCache[this.ENDBOSS_INTRODUCE[i]]; i++;

            if (i >= this.ENDBOSS_INTRODUCE.length) {
                clearInterval(interval);
                this.world?.intervalIdCollection.push(interval);
                
            }
        }, 120);
        this.world?.intervalIdCollection.push(interval);
        
    }


}