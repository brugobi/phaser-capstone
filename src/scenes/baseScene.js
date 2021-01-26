/* eslint-disable */
import { Align } from '../common/util/align';
import { TextObj } from '../common/ui/textObj';
import { AlignGrid } from '../common/util/alignGrid';
import { Model } from '../common/mc/model';
import { EventDispatcher } from '../common/mc/eventDispatcher';
import { Background } from '../common/comps/background';
import { TextStyles } from '../common/ui/textStyles';
import { Controller } from '../common/mc/controller';
import { SoundPanel } from '../common/ui/soundPanel';
import { MediaManager } from '../common/util/mediaManager';

export class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {}

  create() {
    this.mm = MediaManager.getInstance({
      scene: this,
    });
    this.controller = Controller.getInstance();
    this.model = Model.getInstance();
    this.emitter = EventDispatcher.getInstance();
    this.textStyles = TextStyles.getInstance(this.sys.game.config.width);
    //
    this.gw = this.sys.game.config.width;
    this.gh = this.sys.game.config.height;
  }

  setBackground(key) {
    const bg = new Background({
      scene: this,
      key,
    });
    return bg;
  }

  placeImage(key, pos, scale) {
    const image = this.add.sprite(0, 0, key);
    this.aGrid.placeAtIndex(pos, image);
    if (scale !== -1) {
      Align.scaleToGameW(image, scale, this);
    }
    return image;
  }

  placeText(text, pos, style) {
    const textStyle = this.textStyles.getStyle(style);
    const textObj = new TextObj({
      scene: this,
      text,
      textStyle,
    });
    this.aGrid.placeAtIndex(pos, textObj);
    return textObj;
  }

  placeAtIndex(pos, item) {
    this.aGrid.placeAtIndex(pos, item, this);
  }

  placeAt(xx, yy, item) {
    this.aGrid.placeAt(xx, yy, item, this);
  }

  makeAlignGrid(r = 11, c = 11) {
    this.aGrid = new AlignGrid({
      scene: this,
      rows: r,
      cols: c,
    });
  }

  makeGear() {
    const gear = this.add.image(0, 0, 'gear');
    Align.scaleToGameW(gear, 0.1, this);
    this.aGrid.placeAtIndex(110, gear);
    gear.setInteractive();
    gear.on('pointerdown', this.toggleSoundPanel.bind(this));
  }

  makeSoundPanel() {
    this.soundPanel = new SoundPanel({
      scene: this,
    });
    Align.center(this.soundPanel, this);
    this.soundPanel.visible = false;
    this.soundPanel.depth = 2000;
  }

  toggleSoundPanel() {
    this.soundPanel.visible = !this.soundPanel.visible;
  }

  //
  // place an effect on the stage - requires effect extension pack
  //
  /*
    placeEffect(xx, yy, effect) {
        let fx = new Effect({
            scene: this,
            effect: effect,
            x: xx,
            y: yy
        });
    } */
  //
  // get a text style object
  //
  getStyle(style) {
    const textStyle = this.textStyles.getStyle(style);
    return textStyle;
  }

  update() { }
  
}