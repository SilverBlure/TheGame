let canvas;
let ctx;
let world;



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
}

window.addEventListener('keydown',(event) =>{
    console.log(event);
})