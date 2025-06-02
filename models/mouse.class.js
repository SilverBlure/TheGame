class Mouse {
    block = false;
    click = false;
    pos_x;
    pos_y;

    constructor() {
        this.run();
    }

run(){
    setInterval(()=>{
        this.check();
    },1000/60)
}


    check(){
    if (mouse.click) {
        mouse.block = true;
        setTimeout(() => {
            mouse.block = false;
        }, 200);
    }
}
}