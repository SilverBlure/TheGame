/**
 * @class Represent a SoundObject extends Mo for rendering button
 */
class SoundButton extends MovableObject {



    SOUND_FILES = ['assets/sounds/bossHurtSound.mp3',
        'assets/sounds/BubbleShot.wav',
        'assets/sounds/characterSleepSound.wav',
    'assets/sounds/characterWhip.wav',
    'assets/sounds/coinCollection.wav',
    'assets/sounds/gameBGMusic.wav','assets/sounds/GameOver.mp3',
    'assets/sounds/glassCollection.wav', 
    'assets/sounds/mixkit-game-level-completed-2059.wav', 
    'assets/sounds/mixkit-water-bubble-1317.wav',
    'assets/sounds/playerHurt.mp3',
    'assets/sounds/pufferfish_1.wav',
    'assets/sounds/pufferfish_2.wav',
    'assets/sounds/pufferfish_3.mp3',
    'assets/sounds/winning.wav']


    state = null;
    SOUND_IMAGES = ['GUI/volumeOff.svg',
        'GUI/volumeOn.svg'];

        SoundCache=[];

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
        this.loadSoundFiles();
        this.startSequence();
    }


    loadSoundFiles(){
        this.SOUND_FILES.forEach((path)=>{
            console.log(path);
        })

            
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