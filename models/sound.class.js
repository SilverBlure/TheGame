/**
 * @class Represent a SoundObject extends Mo for rendering button
 */
class SoundButton extends MovableObject {


    state = null;

    SOUND_IMAGES = ['GUI/volumeOff.svg',
        'GUI/volumeOn.svg'];

    soundCache = {};

    /**
     * @constuctor creates new Soundbutton obj
     */
    constructor() {
        super();
        this.soundImg = document.getElementById('sound');
        this.startSequence();

    }


    /**
     * Method to check sound from local storage, and set
     */
    startSequence() {
        this.checkRegister();
        this.checkState();
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
     * Checks the state, and set the icon
     */
    checkState() {

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
        console.log(soundState);
        if (soundState == 'true') {
            localStorage.setItem('sound', false);
            this.state = false;
        } else if (soundState == 'false') {
            localStorage.setItem('sound', true);
            this.state = true;
        }
        this.checkState();
    }





}