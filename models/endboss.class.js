class Endboss extends MovableObject {
height= 300;
width=300;
x =150;
y= 150;

endboss_stay = [
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



    constructor(){
        super().loadImage(this.endboss_stay[0]);
        this.x = 2550; 
         this.loadImages(this.endboss_stay);
         this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.endboss_stay);
        }, 200);
    }


}