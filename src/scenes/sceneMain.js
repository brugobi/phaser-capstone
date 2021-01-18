/* eslint-disable no-undef */
/* eslint-disable no-undef */
/* eslint no-unused-vars: "error" */
import { BaseScene } from './baseScene';
import { Clock } from '../common/comps/clock';
import { Player } from '../common/comps/player';
import { GunShip } from '../common/comps/enemies';
import { CarrierShip } from '../common/comps/enemies';
import { ChaserShip } from '../common/comps/enemies';
import dude from '../../assets/images/dude.png';

export class SceneMain extends BaseScene {
  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.spritesheet('dude', dude, { frameWidth: 30, frameHeight: 48 });
    this.load.image('sprBg0', '../../assets/images/sprBg0.png');
    this.load.image('sprBg1', '../../assets/images/sprBg1.png');
    this.load.spritesheet('sprExplosion', '../../assets/images/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', '../../assets/images/sprEnemy0.png', {
      frameWidth: 29,
      frameHeight: 48,
    });
    this.load.spritesheet('sprEnemy1', '../../assets/images/sprEnemy1.png', {
      frameWidth: 32,
      frameHeight: 49,
    });
    this.load.spritesheet('sprEnemy2', '../../assets/images/sprEnemy2.png', {
      frameWidth: 21,
      frameHeight: 36,
    });
    this.load.image('sprLaserEnemy0', '../../assets/images/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', '../../assets/images/sprLaserPlayer.png');

    this.load.audio('sndExplode0', '../../assets/images/sndExplode0.wav');
    this.load.audio('sndExplode1', '../../assets/images/sndExplode1.wav');
    this.load.audio('sndLaser', '../../assets/images/sndLaser.wav');
  }

  create() {
    super.create();
    this.makeAlignGrid(11, 11);

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy1',
      frames: this.anims.generateFrameNumbers('sprEnemy1'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'dude',
      frames: this.anims.generateFrameNumbers('dude'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.setBackground('background_main');
    this.makeUi();

    let scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });

    // this.aGrid.showNumbers();
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'dude',
    );

    // player.setBounce(0.2);
    // player.setCollideWorldBounds(true);

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.timer1 = this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            0,
            Phaser.Math.Between(0, this.game.config.width),
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              0,
              Phaser.Math.Between(0, this.game.config.width),
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            0,
            Phaser.Math.Between(0, this.game.config.width),
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // To add collisions If we wanted to have the enemy destroyed upon being hit by a player laser
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerLaser.destroy();
        playerLaser.player.score += 10;
        scoreText.setText(`Score: ${playerLaser.player.score}`);
      }
    });

    // add a collider between this.player and this.enemies:
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    // We can also add a collider between this.player and this.enemyLasers.
    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });
  }

  makeUi() {
    super.makeSoundPanel();
    super.makeGear();

    const clock = new Clock({
      scene: this,
      callback: this.timeUp.bind(this),
    });
    clock.setClock(300);
    this.placeAtIndex(10, clock);
    clock.startClock();
  }

  timeUp() {
    this.timer1.remove();
    this.scene.start('SceneOver');
  }

  update() {
    this.player.update();

    // If we run the game, you may notice that the player can still move around and shoot, 
    // even if the player ship explodes. We can fix this by adding a check around the player 
    // update call and the movement and shooting calls in SceneMain.
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    // to make the enemies chasing you
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      // it will be a good idea to add what is called frustum culling. Frustum culling will allow us to remove everything that moves off screen, which frees up processing power and memory
      if (enemy.x < -enemy.displayWidth
                || enemy.x > this.game.config.width + enemy.displayWidth
                || enemy.y < -enemy.displayHeight * 4
                || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    // Frustum culling for enimies
      for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
                || laser.x > this.game.config.width + laser.displayWidth
                || laser.y < -laser.displayHeight * 4
                || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    // Frustum culling for player
      for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
                || laser.x > this.game.config.width + laser.displayWidth
                || laser.y < -laser.displayHeight * 4
                || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  // code will allow us to provide an enemy type and get all the enemies in the enemies group. 
  // This code loops through the enemies group and checks if the type of the enemy in the loop 
  // is equal to the type that is given as a parameter.
  getEnemiesByType(type) {
    const arr = [];
      for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}