/* eslint-disable import/prefer-default-export */
import {
  ToggleButton,
} from './toggleButton';
import {
  UIBlock,
} from './uiblock';
import {
  Align,
} from '../util/align';
import {
  Model,
} from '../mc/model';

export class SoundPanel extends UIBlock {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    const model = Model.getInstance();
    //
    //
    //
    this.back = this.scene.add.image(0, 0, 'panelBack');
    Align.scaleToGameW(this.back, 0.6, this.scene);
    this.add(this.back);
    //
    //
    const btnMusic = new ToggleButton({
      scene: this.scene,
      backKey: 'toggle2',
      onIcon: 'musicOn',
      offIcon: 'musicOff',
      event: 'TOGGLE_MUSIC',
      scale: 0.2,
      value: model.musicOn,
      x: 0,
      y: 0,
    });
    this.add(btnMusic);
    //
    //
    //
    const btnSound = new ToggleButton({
      scene: this.scene,
      backKey: 'toggle2',
      onIcon: 'sfxOn',
      offIcon: 'sfxOff',
      event: 'TOGGLE_SOUND',
      value: model.soundOn,
      scale: 0.2,
      x: 0,
      y: 0,
    });
    this.add(btnSound);
    //
    //
    //
    btnMusic.x = this.back.x - this.back.displayWidth * 0.25;
    btnSound.x = this.back.x + this.back.displayWidth * 0.25;
  }
}