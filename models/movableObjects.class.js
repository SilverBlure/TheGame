class MovableObject{

    x = 120;
    y = 220;
    img;
    height = 100;
    width = 100;
    imageCach ={};
    currentImage = 0;
    speed = 1.5;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path)=> {
            let img = new Image();
            img.src = path;
            this.imageCach[path] = img;
        });
    }

    moveRight(){
        console.log('Moving right');

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60);
    }
}