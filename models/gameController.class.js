class GameController {

  canvas;
  mouse;
  keyboard;
  world;
  menue;
  landscape;
  state = "menue";
  firstLoad = true;
  device = null;
  sound = new SoundButton();
  switched = null;

  constructor(canvas, ctx, mouse, keyboard,) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = mouse;
    this.keyboard = keyboard;
    this.block = document.getElementById('portraitBlock');
    this.dialogBG = document.getElementById('dialogBlock');
    this.device = this.getdevice();
    this.fullscreen = new Fullscreen(canvas);
    this.buttons = document.getElementById('buttons');
    this.activ = true;
    this.checkLoop();
    this.loop();
    this.loadMenue();
  }



  checkLoop(){
    setInterval(()=>{
    this.checkLandscape(); 
    },1000)
  }

  /**loading menue */
  loadMenue() {
    if (this.menue && this.state === "menue") return;
    this.mouse.block = false;
    this.state = "menue";
    this.menue = new Menue(this.canvas, this.mouse, () => this.loadWorld(), this.sound, this.fullscreen, this.state)
    this.activ = true;
    this.resetCss();
  }

resetCss(){
  this.buttons.classList.replace('?','buttons');
}

  showinformation() {
    this.dialogBG.classList.remove('d-none');
    this.dialogBG.innerHTML = this.informationTemplate();
  }


  /**check if landscape mode */
  isLandscapeMode() {
    return window.innerWidth > window.innerHeight
  }


  /**gets the device desktop or mobile */
  getdevice() {
    if (this.isMobileDevice()) return "mobile"
  }


  /**gets the device desktop or mobile */
  isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


  /**loading World */
  loadWorld() {
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
      this.loadMenue()
      , this.sound, this.fullscreen);
    this.state = "game";
    this.addHideButton()
    this.activ = true;
  }


  /**game mode loop funktion */
  loop() {
    if (this.state === "menue" && this.menue) {
      this.menue.draw();
    } else if (this.state === "game" && this.world) {
      this.world.loop();
    }
    this.checkButtons();
    requestAnimationFrame(() => this.loop());
  }


  
  checkLandscape() {
    if (this.isLandscapeMode()) {
      this.block.innerHTML = this.changeFormatTemplate();
      this.block.classList.add('d-none');
    } else {
      this.block.classList.remove('d-none');
    }
  }



checkButtons() {
    if (this.state === 'menue' && this.activ) {
      this.activ = false;
    } else if (this.state === 'game' && this.activ) {
      this.clear
      this.renderGameFullscreenBTN();
      this.buttons.classList.remove('hide');
      this.activ = false;
    }
  }

  /**world reset funtion */
  resetGame() {
    if (this.world) {
      if (typeof this.world.cleanUp === "function") {
        this.world.cleanUp();
      }
    }
    this.loadWorld();
  }


  addHideButton() {
    this.buttons.classList.toggle('hide');
  }


  renderGameFullscreenBTN() {
    this.buttons.classList.remove('buttons');
    this.buttons.classList.add('positionBottomRight');
    this.buttons.innerHTML = ` 
        <div class="buttons index">
        <button class="inGameFullscreenBtn" id="button" onclick="toggleFullscreen(content)">
        <img class="help" src="GUI/fullscreenInGame.svg">
        </button>
        </div>`;

  }

 toggleDialogBg(){
  this.dialogBG.classList.toggle('d-none');
 }

 toggleOverflow(){
  document.getElementById('body').classList.toggle('overflow');
 }

  changeFormatTemplate() {
    return `<img class="blockImg" src="./GUI/Please_Landscape.png">`
  }


  informationTemplate() {
    this.toggleOverflow();
    return ` <div id="help" class="infoBlock">
          <div class="containerTable">
            <table>
                <tr>
                    <td><img class="tableImages" src="./images/keycap_arrowBotns.png"></td>
                    <td>
                        <p>With the arrow keys u can steer Sharky</p>
                    </td>
                    <td><img class="tableImages" src="./images/keycap_a.png"></td>
                    <td>
                        <p>With the a button sharky shots a poison bubble <br> (use it wisley cuz is the only fear of
                            the boss)</p>
                    </td>
                </tr>
                <tr>
                    <td><img class="tableImages" src="./images/keycap_esc.png"></td>
                    <td>
                        <p>With the esc button u can disable <br> the fullscreen mode</p>
                    </td>
                     <td><img class="tableImages" src="./images/keycap_s.png"></td>
                    <td>
                        <p>With the s sharky attacks with the tail whip!></p>
                    </td>
                </tr>
            </table>
          </div>
          <div class="containerClose">
          <button class="cleanButton" onclick="game.toggleDialogBg(), game.toggleOverflow()"                        >
            <h1  class="close">  Back </h1>
            </button>
            </div>
        </div>`;
  }


}
