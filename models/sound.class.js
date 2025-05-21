class SoundButton extends MovableObject {

    state = true;

    SOUND_IMAGES = ['GUI/volumeOff.svg',
        'GUI/volumeOn.svg'];



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
            localStorage.setItem('sound', 'true');
        }
    }

    setSoundOn() {
        localStorage.setItem('sound', 'true');
    }

    setSoundOff() {
        localStorage.setItem('sound', 'false');
    }

    checkState() {
        let soundState = localStorage.getItem('sound');
        if (soundState == 'true') {
            this.loadImage(this.SOUND_IMAGES[1]);
        } else if (soundState == 'false') {
            this.loadImage(this.SOUND_IMAGES[0]);
        }
    }

    clickToggle() {
        let soundState = localStorage.getItem('sound');
        if (soundState == 'true') {
            localStorage.setItem('sound', false);
            this.state = false;
        } else if (soundState == 'false') {
            localStorage.setItem('sound', true);
            this.state = true;

        }
    }

}