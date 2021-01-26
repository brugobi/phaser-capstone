/* eslint-disable */
import { Entity } from './entities';
import Dom from '../util/dom';

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 200);
    this.play('dude');
    this.score = 0;

    // giving the player the ability to shoot
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  onDestroy() {
    this.scene.time.addEvent({ // go to game over scene
      delay: 1000,
      callback() {
        this.dom = new Dom();
        this.scene.add.dom(300, 300, this.dom.createInputName());
        this.dom.addBtnEvent(this);
        // this.scene.scene.start("SceneOver");
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    // add the rest of the logic for our “manual timer”:
    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else { // when the "manual timer" is triggered:
        const laser = new PlayerLaser(this.scene, this.x, this.y, this);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y, player) {
    super(scene, x, y, 'sprLaserPlayer');
    this.body.velocity.x = -200;
    this.player = player;
  }
}