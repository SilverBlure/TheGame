class SoundButton extends MovableObject {

    volumeState = 'on'; //off

    SOUND_IMAGES = ['./../GUI/volumeOff.svg',
        './../GUI/volumeOn.svg'];


        
    constructor() {
        super();
        this.loadImages(this.SOUND_IMAGES);
        this.x = 620;
        this.y = 20;
        this.width = 80;
        this.height = 80;
        this.startSequence();
    }

    startSequence() {
        this.checksound();
        this.checkState();
    }

    checksound() {
        try {
            this.volume = localStorage.getItem(sound);
        } catch (error) {
            localStorage.setItem('sound', 'on');
        }
    }

    setSoundOn() {
        localStorage.setItem('sound', 'on');
    }

    setSoundOff() {
        localStorage.setItem('sound', 'off');
    }

    checkState() {
        let soundState = localStorage.getItem('sound');
        if (soundState === 'on') {
            this.loadImage(this.SOUND_IMAGES[1]);
        } else if (soundState === 'off') {
            this.loadImage(this.SOUND_IMAGES[0]);
        }
    }

    clickToggle() {
        let soundState = localStorage.getItem('sound');
        if (soundState === 'on') {
            localStorage.setItem('sound', 'off');
        } else if (soundState === 'off') {
            localStorage.setItem('sound', 'on');
        }
    }

}