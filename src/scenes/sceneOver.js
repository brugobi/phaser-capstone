import { BaseScene } from './baseScene';
import { FlatButton } from '../common/ui/flatButton';

/* eslint-disable import/prefer-default-export */
export class SceneOver extends BaseScene {
  constructor() {
    super('SceneOver');
  }

  /* eslint-disable class-methods-use-this */
  preload() {}

  create() {
    super.create();
    this.setBackground('background_over');
    this.makeAlignGrid(11, 11);
    this.placeText('Game Over', 27, 'TITLE_TEXT');
    //
    //  let buttonStyle = this.textStyles.getStyle(TextStyles.BUTTON_STYLE);
    const btnNext = new FlatButton({
      scene: this,
      textStyle: 'BUTTON_STYLE',
      key: 'button',
      text: 'Play Again',
      callback: this.playAgain.bind(this),
    });
    this.aGrid.placeAtIndex(104, btnNext);
    //
    const btnScore = new FlatButton({
      scene: this,
      textStyle: 'BUTTON_STYLE',
      key: 'button',
      text: 'See Score',
      callback: this.seeScore.bind(this),
    });
    this.aGrid.placeAtIndex(60, btnScore);
    //
    this.makeUi();
  }

  makeUi() {
    super.makeSoundPanel();
    super.makeGear();
  }

  playAgain() {
    this.scene.start('SceneMain');
  }

  seeScore() {
    this.scene.start('SceneScore');
  }

  /* eslint-disable class-methods-use-this */
  update() {}
}