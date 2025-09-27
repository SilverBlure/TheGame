/**
 * @class
 * this clas ist the game controler it sets the menue mode or the game mode

 */
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
  sound = new SoundButton(this);
  switched = null;

  /**
   * @constructor
   * @param {object} canvas 
   * @param {object} ctx 
   * @param {object} mouse 
   * @param {object} keyboard 
   * set canvas
   * set content
   * set mause
   * set keyboard
   * set device witch getdevice func
   * set dialog from html
   * set buttons from html
   * set active to true
   */
  constructor(canvas, ctx, mouse, keyboard, content) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.content = content;
    this.mouse = mouse;
    this.keyboard = keyboard;
    this.dialogBG = document.getElementById('dialogBlock');
    this.device = this.getdevice();
    this.fullscreen = new Fullscreen(canvas);
    this.buttons = document.getElementById('buttons');
    this.activ = true;
    this.loop();
    this.loadMenue();
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

  /**
   * replace buttons css with the buttons class
   */
  resetCss() {
    this.buttons.classList.replace('?', 'buttons');
  }

  /**
   * removes the dnone css class from dialogBG
   * and set a template
   */
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
    return (
      /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document) ||
      (navigator.maxTouchPoints > 0)
    );
  }


  /**loading World */
  loadWorld() {
    const level = createLevel1();
    this.world = new World(this.canvas, this.keyboard, this.mouse, () =>
      this.loadMenue()
      , this.sound, this.fullscreen, level);
    this.state = "game";
    this.addHideButton()
    this.activ = true;
    if (this.isMobileDevice() && this.isLandscapeMode()) {
      if (!document.fullscreen) {
        toggleFullscreen(this.content);
      }
    }
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



  /**
   * checkButtons for the first time 
   */
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

  /**toggles the hide class in the button html */
  addHideButton() {
    this.buttons.classList.toggle('hide');
  }

  /**
   * remove buttons class on the button html add another class
   * and load html template
   */
  renderGameFullscreenBTN() {
    this.buttons.classList.remove('buttons');
    this.buttons.classList.add('positionBottomRight');
    this.buttons.innerHTML = ` 
        <div class="buttons index">
        <button class="inGameFullscreenBtn" id="button" onclick="event.stopPropagation(), toggleFullscreen(content)">      
        <img class="help" src="GUI/fullscreenInGame.svg">
        </button>
        </div>`;

  }

  /**toggles the d/none class on dialog bg */
  toggleDialogBg() {
    this.dialogBG.classList.toggle('d-none');
  }

  /**
   * toggles the overflow class in the html body
   */
  toggleOverflow() {
    document.getElementById('body').classList.toggle('overflow');
  }


  /**
   * 
   * @returns a html template 
   */
  informationTemplate() {
    this.toggleOverflow();
    return ` <div id="help" class="infoBlock" onclick="game.toggleDialogBg(), game.toggleOverflow()">
          <div class="containerTable">
            <table>
                <tr>
                    <td><img class="tableImages" src="./images/keycap_arrowBotns.png"></td>
                    <td>
                        <p>With the arrow keys </p>\n<p>u can steer Sharky</p>
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
                        <p>With the s sharky attacks</p>\n<p> with the tail whip!</p>
                    </td>
                </tr>
            </table>
          </div>
        </div>`;
  }

  /**
   * calls dialog bg func
   * and set an html template for the impressum
   */
  impressumTemplate() {
    this.toggleDialogBg();
    document.getElementById('dialogBlock').innerHTML = `<div class="centerText" onclick="game.toggleDialogBg(), game.toggleOverflow()">
        
          <div class="divImpressum">
            <h1 class="impressumHeadline" headline id="headline">Sharky the Game</h1>

            <h2>Impressum</h2><br>

            <h3>Angaben gemäß § 5 TMG und § 55 Abs. 2 RStV:</h3>

            <p class="impressumContent">Nicolai Oesterle<br>
                Logauweg 117<br>
                89075 Ulm<br>
                Deutschland<br>
                <br>
                E-Mail: oesterle.ni@Schaefferchen.org<br>
                <br>
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br>
                Nicolai Oesterle<br>
                Logauweg 117<br>
                89075 Ulm<br>
                <br>
                Haftungsausschluss:<br>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer
                Links.<br>Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.<br>
                <br>
                Hinweis zu Spenden:<br>
                Diese Seite wird auf freiwilliger Basis betrieben. <br>Zur Unterstützung meiner Arbeit nehme ich Spenden
                entgegen. <br>Spenden stellen keine Gegenleistung dar und begründen kein Vertragsverhältnis.
            </p></span>
        
        </div>
    </div>`
  }

}
