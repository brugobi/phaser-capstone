/* eslint-disable no-unused-vars */
import { BaseScene } from './baseScene';
import { FlatButton } from '../common/ui/flatButton';
import { Align } from '../common/util/align';
import { getScore } from '../common/util/api';

/* eslint-disable import/prefer-default-export */
export class SceneScore extends BaseScene {
  constructor() {
    super('SceneScore');
  }

  /* eslint-disable class-methods-use-this */
  preload() {
    this.load.spritesheet('load', './assets/images/load.png', { frameWidth: 57, frameHeight: 50 });
  }

  create() {
    super.create();

    this.setBackground('background_over');
    this.makeAlignGrid(11, 11);
    // this.aGrid.showNumbers();
    this.placeText('Score', 27, 'TITLE_TEXT');

    const load = this.physics.add.sprite(0, 0, 'load');
    this.anims.create({
      key: 'load',
      frames: this.anims.generateFrameNumbers('load', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.aGrid.placeAtIndex(60, load);
    load.anims.play('load', true);
    Align.scaleToGameW(load, 0.10, this);

    getScore().then((response) => {
      const sortedScore = response.sort((a, b) => b.score - a.score);
      let colum1 = '';
      let colum2 = '';

      for (let i = 0; i < 10; i += 1) {
        if (i < 5) {
          colum1 += `${i + 1})${sortedScore[i].user}: ${sortedScore[i].score
          }\n`;
        } else {
          colum2 += `${i + 1})${sortedScore[i].user}: ${sortedScore[i].score
          }\n`;
        }
        if (i === sortedScore.length - 1) {
          break;
        }
      }
      load.destroy();
      if (colum2 !== '') {
        this.placeText(colum1, 69, '');
        this.placeText(colum2, 74, '');
      } else {
        this.placeText(colum1, 71, '');
      }
    }).catch(() => {
      load.destroy();
      this.placeText(':/ try again later!', 60, 'RED');
    });

    const btnNext = new FlatButton({
      scene: this,
      textStyle: 'BUTTON_STYLE',
      key: 'button',
      text: 'Play Again',
      callback: this.playAgain.bind(this),
    });
    this.aGrid.placeAtIndex(104, btnNext);
    this.makeUi();
  }

  makeUi() {
    super.makeSoundPanel();
    super.makeGear();
  }

  playAgain() {
    this.scene.start('SceneMain');
  }

  /* eslint-disable class-methods-use-this */
  update() { }
}
