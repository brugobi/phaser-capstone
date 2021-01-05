import { BaseScene } from "./baseScene";
import { Align } from "../common/util/align";
import { FormUtil } from "../common/util/formUtil";
//
import { Player } from '../common/comps/player';
import background_main from '../../assets/images/background_main.png';
// import sprPlayer from '../../assets/images/sprPlayer.png';
import dude from '../../assets/images/dude.png'
//
export class SceneMain extends BaseScene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image('background_main', background_main);
        this.load.spritesheet('dude', dude, { frameWidth: 30, frameHeight: 48 });

        // testing
        // this.load.image("sprBg0", "../../assets/images/sprBg0.png");
        // this.load.image("sprBg1", "../../assets/images/sprBg1.png");
        // this.load.spritesheet("sprExplosion", "../../assets/images/sprExplosion.png", {
        //     frameWidth: 32,
        //     frameHeight: 32
        // });
        // this.load.spritesheet("sprEnemy0", "../../assets/images/sprEnemy0.png", {
        //     frameWidth: 16,
        //     frameHeight: 16
        // });
        // this.load.image("sprEnemy1", "../../assets/images/sprEnemy1.png");
        // this.load.spritesheet("sprEnemy2", "../../assets/images/sprEnemy2.png", {
        //     frameWidth: 16,
        //     frameHeight: 16
        // });
        // this.load.image("sprLaserEnemy0", "../../assets/images/sprLaserEnemy0.png");
        // this.load.image("sprLaserPlayer", "../../assets/images/sprLaserPlayer.png");
        // this.load.spritesheet("sprPlayer", "content/sprPlayer.png", {
        //     frameWidth: 16,
        //     frameHeight: 16
        // });

        // this.load.audio("sndExplode0", "../../assets/images/sndExplode0.wav");
        // this.load.audio("sndExplode1", "../../assets/images/sndExplode1.wav");
        // this.load.audio("sndLaser", "../../assets/images/sndLaser.wav");
        // end testing
    }

    create() {
        super.create();
        this.makeAlignGrid(11, 11);

        //testing here
        // this.anims.create({
        //     key: "sprEnemy0",
        //     frames: this.anims.generateFrameNumbers("sprEnemy0"),
        //     frameRate: 20,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: "sprEnemy2",
        //     frames: this.anims.generateFrameNumbers("sprEnemy2"),
        //     frameRate: 20,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: "sprExplosion",
        //     frames: this.anims.generateFrameNumbers("sprExplosion"),
        //     frameRate: 20,
        //     repeat: 0
        // });

        // this.anims.create({
        //     key: "dude",
        //     frames: this.anims.generateFrameNumbers("dude"),
        //     frameRate: 20,
        //     repeat: -1
        // });

        // this.sfx = {
        //     explosions: [
        //         this.sound.add("sndExplode0"),
        //         this.sound.add("sndExplode1")
        //     ],
        //     laser: this.sound.add("sndLaser")
        // };

        //end testing
        
        // mine
        this.setBackground('background_main');
        this.makeUi();   
        //this.aGrid.showNumbers();
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "dude"
        );
        
        //player.setBounce(0.2);
        //player.setCollideWorldBounds(true);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //this.placeImage('cowboy4', 60, .25);
        // mine up to here  
    }

    makeUi() {
        super.makeSoundPanel();
        super.makeGear();
    }

    // mine down here
    update() {
        this.player.update();

        if (this.keyW.isDown) {
            this.player.moveUp();
            console.log(this.player);
        }
        else if (this.keyS.isDown) {
            this.player.moveDown();
        }

        if (this.keyA.isDown) {
            this.player.moveLeft();
        }
        else if (this.keyD.isDown) {
            this.player.moveRight();
        }
    }
   
    
}