import { BaseScene } from "./baseScene";
import { Align } from "../common/util/align";
import { FormUtil } from "../common/util/formUtil";
//
import { Player } from '../common/comps/player';
import { PlayerLaser } from '../common/comps/player';
import { GunShip } from '../common/comps/enemies';
import { CarrierShip } from '../common/comps/enemies';
import { ChaserShip } from '../common/comps/enemies';
import { EnemyLaser } from '../common/comps/enemies';
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
        this.load.image("sprBg0", "../../assets/images/sprBg0.png");
        this.load.image("sprBg1", "../../assets/images/sprBg1.png");
        this.load.spritesheet("sprExplosion", "../../assets/images/sprExplosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprEnemy0", "../../assets/images/sprEnemy0.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("sprEnemy1", "../../assets/images/sprEnemy1.png");
        this.load.spritesheet("sprEnemy2", "../../assets/images/sprEnemy2.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("sprLaserEnemy0", "../../assets/images/sprLaserEnemy0.png");
        this.load.image("sprLaserPlayer", "../../assets/images/sprLaserPlayer.png");
        this.load.spritesheet("sprPlayer", "content/sprPlayer.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.audio("sndExplode0", "../../assets/images/sndExplode0.wav");
        this.load.audio("sndExplode1", "../../assets/images/sndExplode1.wav");
        this.load.audio("sndLaser", "../../assets/images/sndLaser.wav");
        // end testing
    }

    create() {
        super.create();
        this.makeAlignGrid(11, 11);

        //testing here
        this.anims.create({
            key: "sprEnemy0",
            frames: this.anims.generateFrameNumbers("sprEnemy0"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprEnemy2",
            frames: this.anims.generateFrameNumbers("sprEnemy2"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "dude",
            frames: this.anims.generateFrameNumbers("dude"),
            frameRate: 20,
            repeat: -1
        });

        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
                this.sound.add("sndExplode1")
            ],
            laser: this.sound.add("sndLaser")
        };

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

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: function () {
                var enemy = null;

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        0,
                        Phaser.Math.Between(0, this.game.config.width)
                    );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {

                        enemy = new ChaserShip(
                            this,
                            0,
                            Phaser.Math.Between(0, this.game.config.width)
                        );
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        0,
                        Phaser.Math.Between(0, this.game.config.width)
                    );
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });
        
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

        // allow the player to shoot
        if (this.keySpace.isDown) {
            this.player.setData("isShooting", true);
        }
        else {
            this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
            this.player.setData("isShooting", false);
        }

        // to make the enemies chasing you
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];

            enemy.update();

            // it will be a good idea to add what is called frustum culling. Frustum culling will allow us to remove everything that moves off screen, which frees up processing power and memory
            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {

                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }

                    enemy.destroy();
                }

            }
        }

        // Frustum culling for enimies
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        // Frustum culling for player
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
    }


    // code will allow us to provide an enemy type and get all the enemies in the enemies group. This code loops through the enemies group and checks if the type of the enemy in the loop is equal to the type that is given as a parameter.
    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }
   
    
}