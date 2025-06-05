/**
 * @class Represent a SoundObject extends Mo for rendering button
 */
class SoundButton extends MovableObject {

    state = null;
    SOUND_IMAGES = ['GUI/volumeOff.svg',
        'GUI/volumeOn.svg'];


    /**
     * @constuctor creates new Soundbutton obj
     */
    constructor() {
        super();
        this.loadImages(this.SOUND_IMAGES);
        this.x = 620;
        this.y = 20;
        this.width = 80;
        this.height = 80;
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
        if (localStorage.getItem('sound')) {
        }
        else {
            localStorage.setItem('sound', 'true')
        }
    }

    /**
     * Checks the state, and set the icon
     */
    checkState() {
        let soundState = localStorage.getItem('sound');
        if (soundState == 'true') {
            this.loadImage(this.SOUND_IMAGES[1]);
        } else if (soundState == 'false') {
            this.loadImage(this.SOUND_IMAGES[0]);
           
        }
    }


    /**
     * Sound toggle method, calls checkstate method
     */
    clickToggle() {
        let soundState = localStorage.getItem('sound');
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