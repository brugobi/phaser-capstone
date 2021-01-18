/* eslint-disable import/prefer-default-export */
import { BaseScene } from './baseScene';
import { Bar } from '../common/comps/bar';
import { Align } from '../common/util/align';

export class SceneLoad extends BaseScene {
  constructor() {
    super('SceneLoad');
  }

  preload() {
    this.common = './assets/';
    this.imagePath = `${this.common}images/`;
    this.audioPath = `${this.common}audio/`;
    //
    this.bar2 = new Bar({
      scene: this,
      height: this.sys.game.config.height * 0.1,
      width: this.sys.game.config.width * 0.8,
      color: 0xffffff,
    });
    this.bar = new Bar({
      scene: this,
      height: this.sys.game.config.height * 0.1,
      width: this.sys.game.config.width * 0.8,
    });
    Align.center(this.bar, this);
    Align.center(this.bar2, this);
    //
    this.load.on('progress', this.onProgress, this);
    //
    const iconArray = ['gear', 'musicOff', 'musicOn', 'sfxOn', 'sfxOff', 'iconLock', 'iconHome', 'iconNext', 'iconPrev'];
    for (let i = 0; i < iconArray.length; i += 1) {
      this.loadIcon(iconArray[i]);
    }
    //
    const pngArray = ['panelBack', 'title', 'background_main', 'background_over'];
    for (let i = 0; i < pngArray.length; i += 1) {
      this.loadPng(pngArray[i], this.imagePath);
    }
    //
    const jpgArray = ['background_title'];
    for (let i = 0; i < jpgArray.length; i += 1) {
      this.loadJpg(jpgArray[i], this.imagePath);
    }
    //
    const wavArray = [];
    for (let i = 0; i < wavArray.length; i += 1) {
      this.loadWav(wavArray[i], this.audioPath);
    }
    //
    const mp3Array = ['TWD_title'];
    for (let i = 0; i < mp3Array.length; i += 1) {
      this.loadMp3(mp3Array[i], this.audioPath);
    }
    //
    const cwavArray = [];
    for (let i = 0; i < cwavArray.length; i += 1) {
      this.loadWav(cwavArray[i]);
    }
    //
    const cmp3Array = [];
    for (let i = 0; i < cmp3Array.length; i += 1) {
      this.loadMp3(cmp3Array[i]);
    }
    //
    this.loadToggle(1);
    this.loadToggle(2);
    this.loadButton('button', 1, 2);
    this.load.image('holder', `${this.common}images/ui/backs/holder.jpg`);
  }

  onProgress(value) {
    // let per = Math.floor(value * 100);
    this.bar.setPercent(value);
  }

  create() {
    this.scene.start('SceneTitle');
  }

  loadButton(key, style, number) {
    this.load.image(key, `${this.imagePath}ui/buttons/${style}/${number}.png`);
  }

  loadIcon(key) {
    this.load.image(key, `${this.imagePath}ui/icons/${key}.png`);
  }

  loadToggle(key) {
    this.load.image(`toggle${key}`, `${this.imagePath}ui/toggles/${key}.png`);
  }

  loadJpg(key, mainPath = '') {
    if (mainPath === '') {
      mainPath = this.imagePath;
    }
    this.load.image(key, `${mainPath + key}.jpg`);
  }

  loadPng(key, mainPath = '') {
    if (mainPath === '') {
      mainPath = this.imagePath;
    }
    this.load.image(key, `${mainPath + key}.png`);
  }

  loadWav(key, mainPath = '') {
    if (mainPath === '') {
      mainPath = this.audioPath;
    }
    this.load.audio(key, `${mainPath + key}.wav`);
  }

  loadMp3(key, mainPath = '') {
    if (mainPath === '') {
      mainPath = this.audioPath;
    }
    this.load.audio(key, `${mainPath + key}.mp3`);
  }

  /* eslint-disable class-methods-use-this */
  update() {}
}