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

//wenn die maus taste geklickt wird wir sie geblockt fuer ca 200ms damit eine dauerhafte bestaetigung
// nicht funktioniert.
    check(){
    if (mouse.click) {
        mouse.block = true;
        setTimeout(() => {

            mouse.block = false;
            console.log('Maus wieder Frei!')
        }, 20);
    }
}
}