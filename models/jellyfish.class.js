class Jellyfish extends MovableObject{
energy = 20;
base_y;
range = 50;
stateDirection = null;
now = 0;


IDLE_JELLYFISH = ['assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'assets/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];

    DEAD_JELLYFISH = ['assets/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'assets/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'assets/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'assets/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ]

constructor(){
    super();
    this.loadImage(this.IDLE_JELLYFISH[0]);
    this.loadImages(this.DEAD_JELLYFISH);
    this.loadImages(this.IDLE_JELLYFISH);
    this.x = 500 + Math.random() * 1800;
    this.y = 400 * Math.random();
    this.width = 100;
    this.height = 100;
    this.speed = Math.random() * 1.5;
    this.base_y = this.y
    this.firstSetup();
}

animate(){
    this.floating();
    this.regulator();
}

regulator(){
    this.now++;
    if( this.now >= 30){
        this.playAnimation(this.IDLE_JELLYFISH);
        this.now = 0;
        ;
    }
 }   
 
floating(){
if(this.stateDirection ==='UP'){
    this.y += this.speed;
    if(this.y >= this.base_y + this.range){
        this.stateDirection = 'DOWN';
    }
}
if(this.stateDirection === 'DOWN'){
    this.y -= this.speed;
    if(this.y <= this.base_y - this.range){
        this.stateDirection = 'UP';
    }
}

}

firstSetup(){
    let randomNum = Math.random();
if(randomNum >0.5){
    this.stateDirection = 'UP';
}else{
    this.stateDirection = 'DOWN';
}
}
}