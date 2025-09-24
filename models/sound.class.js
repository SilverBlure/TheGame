/**
 * @class Represent a SoundObject extends Mo for rendering button
 */
class SoundButton extends MovableObject {

    state = 'false';

    SOUND_IMAGES = ['GUI/volumeOff.svg',
        'GUI/volumeOn.svg'];

    soundCache = {};

    /**
     * @constuctor 
     * extends from MovableObject
     * load html element
     * calls init func
     */
    constructor() {
        super();
        this.soundImg = document.getElementById('sound');
        this.init();

    }


    /**
     * Method to check sound from local storage, and set
     */
    init() {
        this.checkRegister();
        this.checkImgState();
        this.setState();
    }

    /**
     * Checks register of local storage, if nothing there set one
     */
    checkRegister() {
        if (!localStorage.getItem('sound')) {
            localStorage.setItem('sound', 'false')
        }

    }

    /**
     * read the localStorage 
     */
    setState() {
        this.state = localStorage.getItem('sound');
    }

    /**
     * Checks the state, and set the icon
     */
    checkImgState() {

        let soundState = localStorage.getItem('sound');
        if (soundState == 'true') {
            this.soundImg.innerHTML = '';
            this.soundImg.innerHTML = `
                <img id="soundImg" class="soundImg" src="GUI/volumeOn.svg">`

        } else if (soundState == 'false') {
            this.soundImg.innerHTML = '';
            this.soundImg.innerHTML = `
                <img id="soundImg" class="soundImg" src="GUI/volumeOff.svg">`

        }
    }


    /**
     * Sound toggle method, calls checkstate method
     */
    clickToggle() {
        let soundState = localStorage.getItem('sound');
        if (soundState == 'true') {
            localStorage.setItem('sound', 'false');
            this.state = 'false';
            game.world.audioBGMusik.pause();
        } else if (soundState == 'false') {
            localStorage.setItem('sound', 'true');
            this.state = 'true';
        }
        this.checkGameState();
        this.checkImgState();
    }

    /**
     * checks the sound state and the game state 
     * if anithing iss true sound plays
     */
    checkGameState() {
        if (this.state == 'true' && game.state == 'game') {
                game.world.audioBGMusik.play();
         }
    }

}