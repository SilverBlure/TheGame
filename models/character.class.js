class Character extends MovableObject {
    width = 250;
    height = 200;
    y = 150;
    img;

    constructor() {
        super().loadImage('./../assets/1.Sharkie/1.IDLE/1.png',);
        this.loadImages(['assets/1.Sharkie/1.IDLE/1.png',
            'assets/1.Sharkie/1.IDLE/2.png',
            'assets/1.Sharkie/1.IDLE/3.png',
            'assets/1.Sharkie/1.IDLE/4.png',
            'assets/1.Sharkie/1.IDLE/5.png',
            'assets/1.Sharkie/1.IDLE/6.png',
            'assets/1.Sharkie/1.IDLE/7.png',
            'assets/1.Sharkie/1.IDLE/8.png',
            'assets/1.Sharkie/1.IDLE/9.png',
            'assets/1.Sharkie/1.IDLE/10.png',
            'assets/1.Sharkie/1.IDLE/11.png',
            'assets/1.Sharkie/1.IDLE/12.png',
            'assets/1.Sharkie/1.IDLE/13.png',
            'assets/1.Sharkie/1.IDLE/14.png',
            'assets/1.Sharkie/1.IDLE/15.png',
            'assets/1.Sharkie/1.IDLE/16.png',
            'assets/1.Sharkie/1.IDLE/17.png',
            'assets/1.Sharkie/1.IDLE/18.png',

        ]);
    }

    jump() {

    }

}