let canvas;
let ctx;
let world;
let game;
let keyboard = new Keyboard();
let mouse = new Mouse(canvas);
let inLandscape = window.matchMedia("(orientation: landscape)").matches;

console.log(window)


function init() {


    if (isMobileDevice()) {
        if(inLandscape){
            console.log("Spiel läuft auf Desktop 💻");
        canvas = document.getElementById('canvas');
    game = new GameController(canvas, mouse, keyboard);

    this.canvas = canvas;
    this.canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.pos_x = (event.clientX - rect.left)*(canvas.width / rect.width);
        mouse.pos_y = (event.clientY - rect.top)*(canvas.height / rect.height);
    })
        }else {
            console.log( 'bitte drehe dein geraet!')
        }
        console.log("Spiel läuft auf einem mobilen Gerät 📱");
        document.getElementById('mobile-ui').style.display = 'block';
    } else {
        console.log("Spiel läuft auf Desktop 💻");
        canvas = document.getElementById('canvas');
    game = new GameController(canvas, mouse, keyboard);

    this.canvas = canvas;
    this.canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.pos_x = (event.clientX - rect.left)*(canvas.width / rect.width);
        mouse.pos_y = (event.clientY - rect.top)*(canvas.height / rect.height);
    })
    }

    
        
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        || window.matchMedia("(pointer: coarse)").matches;
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 65) {
        keyboard.A = true;
    }
    if (e.keyCode == 83) {
        keyboard.S = true;
    }
    if (e.keyCode == 20) {
        keyboard.Escape = true;
    }
    if (e.keyCode == 80) {
        keyboard.P = true;
    }
})

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 65) {
        keyboard.A = false;
    }
    if (e.keyCode == 83) {
        keyboard.S = false;
    }
    if (e.keyCode == 20) {
        keyboard.Escape = false;
    }
    if (e.keyCode == 80) {
        keyboard.P = false;
    }
})

window.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
        mouse.click = true;
    }
})

window.addEventListener('mouseup', (e) => {
    if (e.button == 0) {
        mouse.click = false;
    }
})



