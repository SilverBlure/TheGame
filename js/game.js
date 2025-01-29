let canvas;
let ctx;
let world;
let keyboard = new Keyboard();



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

window.addEventListener('keydown',(e) =>{
    if(e.keyCode ==37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 65){
        keyboard.A = true;
    }
    if(e.keyCode == 83){
        keyboard.S = true;
    }
})