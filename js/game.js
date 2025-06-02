let canvas;
let ctx;
let world;
let game;
let keyboard = new Keyboard();
let mouse;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  mouse = new Mouse(canvas);
  game = new GameController(canvas, ctx, mouse, keyboard);

  // Touchstart skalieren
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    //if (game.state === "menue") {
      const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

      if (game.menue.collisionWithButton(game.menue.fullScreen, x ,y) || game.world?.collisionWithButton(game.world.fullScreen, x, y)) {
        if (!document.fullscreenElement) {
          canvas.requestFullscreen().catch((err) =>{});
        }
        if (document.fullscreenElement) {
          console.log('Exit')
          document.exitFullscreen().catch((err) =>{});
        }
      }
      game?.world?.character?.onAnyInput?.();
      handleTouchDown(x, y);
      
    }
  ), { passive: false };

  canvas.addEventListener("touchend", (e) => {
    handleTouchUp();
  });

  // Touchverarbeitung
  function handleTouchDown(x, y) {

    game.menue?.handleTouch(x, y);

    if (game.state === "game") {
      const controller = game.world?.mobileController;
      const kb = game.keyboard;

      if (controller) {
        if (controller.isTouching(controller.A_BUTTON, x, y)) kb.A = true;
        if (controller.isTouching(controller.PAUSE_BUTTON, x, y)) kb.P = true;
        if (controller.isTouching(controller.MELEE_BUTTON, x, y)) kb.S = true;

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

  // Tastatur-Eingaben
  window.addEventListener("keydown", (e) => {
    game?.world?.character?.onAnyInput?.();
    const k = keyboard;
    if (e.keyCode === 37) k.LEFT = true;
    if (e.keyCode === 39) k.RIGHT = true;
    if (e.keyCode === 38) k.UP = true;
    if (e.keyCode === 40) k.DOWN = true;
    if (e.keyCode === 32) k.SPACE = true;
    if (e.keyCode === 65) k.A = true;
    if (e.keyCode === 83) k.S = true;
    if (e.keyCode === 20) k.Escape = true;
    if (e.keyCode === 80) k.P = true;
  });

  window.addEventListener("keyup", (e) => {
    const k = keyboard;
    if (e.keyCode === 37) k.LEFT = false;
    if (e.keyCode === 39) k.RIGHT = false;
    if (e.keyCode === 38) k.UP = false;
    if (e.keyCode === 40) k.DOWN = false;
    if (e.keyCode === 32) k.SPACE = false;
    if (e.keyCode === 65) k.A = false;
    if (e.keyCode === 83) k.S = false;
    if (e.keyCode === 20) k.Escape = false;
    if (e.keyCode === 80) k.P = false;
  });

  // Maus-Klick
  window.addEventListener("mousedown", (e) => {
    if (e.button === 0) mouse.click = true;
    if (game.state === "menue") {
      console.log(document.fullscreenElement);
      if (game.menue.collisionWithButton(game.menue.fullScreen)) {
        if (!document.fullscreenElement) {
          canvas.requestFullscreen();           //<-- öffnet fullscreen  
        }
        else if (document.fullscreenElement && game.menue.collisionWithButton(game.menue.fullScreen)) {
          document.exitFullscreen();      //<-- schließt fullscreen
        }
      }
    }
  });



  // Mausbewegung skalieren
  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.pos_x = (event.clientX - rect.left) * (canvas.width / rect.width);
    mouse.pos_y = (event.clientY - rect.top) * (canvas.height / rect.height);
  });

  window.addEventListener("mouseup", (e) => {
    if (e.button === 0) mouse.click = false;
  });

  // Eingabe zurücksetzen
  function handleTouchUp() {
    let kb = game.keyboard;
    kb.LEFT = false;
    kb.RIGHT = false;
    kb.UP = false;
    kb.DOWN = false;
    kb.SPACE = false;
    kb.A = false;
    kb.S = false;
    kb.Escape = false;
    kb.P = false;
  }
}