let canvas;
let ctx;
let world;
let menue;
let keyboard = new Keyboard();
let mouse = new Mouse();




function init() {
    canvas = document.getElementById('canvas');
    //world = new World(canvas, keyboard, mouse);
    menue = new Menue(canvas, mouse);
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        console.log("Mausposition im Canvas:", mouseX, mouseY);
    });}


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
})

window.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
        mouse.click = true;
        console.log('linke Maustaste geklickt')
    }
})

window.addEventListener('mouseup', (e) => {
    if (e.button == 0) {
        mouse.click = false;
        console.log('linke Maustaste losgelassen')
    }
})




