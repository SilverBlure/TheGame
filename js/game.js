let canvas;
let ctx;
let world;
let game;
let keyboard = new Keyboard();
let mouse = new Mouse(canvas);


function init() {
 
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d"),
      game = new GameController(canvas, ctx, mouse, keyboard);

      this.canvas = canvas;
      this.canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.pos_x = (event.clientX - rect.left) * (canvas.width / rect.width);
        mouse.pos_y =
          (event.clientY - rect.top) * (canvas.height / rect.height);
      });
   

      canvas.addEventListener("touchstart", (e) => {
        e.preventDefault(); 
        const rect = canvas.getBoundingClientRect();
      
        for (let touch of e.touches) {
          const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
          const y = (touch.clientY - rect.top) * (canvas.height / rect.height);
      
          handleTouchDown(x, y);
        }
      }, { passive: false });
      
      canvas.addEventListener("touchend", (e) => {
        handleTouchUp();
      });
}

function handleTouchUp(){
  let kb = game.keyboard;
  kb.LEFT = false;   //keycode 37
  kb.RIGHT = false; //keycode 39
  kb.UP = false; //keycode 38
  kb.DOWN = false;   //keycode 40
  kb.SPACE = false;  //keycode 32
  kb.A = false; //attack mele 65
  kb.S = false; //attack range 83
  kb.Escape = false; //keycode
  kb.P = false; //keycode 
}


function handleTouchDown(x, y) {
  if (!game) return;

  if (game.state === "menue") {
    // Im Menü → Menü-Button prüfen
    if (game.menue) {
      game.menue.handleTouch(x, y);
    }
  } else if (game.state === "game") {
    // Im Spiel → MobileController prüfen
    if (game.world && game.world.mobileController) {
      const controller = game.world.mobileController;
      const kb = game.keyboard;

      if (controller.isTouching(controller.A_BUTTON, x, y)) {
        kb.A = true;
      }
      if (controller.isTouching(controller.PAUSE_BUTTON, x, y)) {
        kb.P = true;
      }
      if (controller.isTouching(controller.D_PAD, x, y)) {
        if (x < controller.D_PAD.x + controller.D_PAD.width / 3) {
          kb.LEFT = true;
        } else if (x > controller.D_PAD.x + controller.D_PAD.width * 2 / 3) {
          kb.RIGHT = true;
        } else if (y < controller.D_PAD.y + controller.D_PAD.height / 3) {
          kb.UP = true;
        } else if (y > controller.D_PAD.y + controller.D_PAD.height * 2 / 3) {
          kb.DOWN = true;
        }
      }
    }
  }
}


 

window.addEventListener("keydown", (e) => {
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
});

window.addEventListener("keyup", (e) => {
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
});

window.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    mouse.click = true;
  }
});

window.addEventListener("mouseup", (e) => {
  if (e.button == 0) {
    mouse.click = false;
  }
});


window.addEventListener("touchstart", (e) => {
  mouse.click = true;
});

window.addEventListener("touchend", (e) => {
  mouse.click = false;
});