import {
  EventDispatcher,
} from './eventDispatcher';
import {
  Model,
} from './model';
import {
  MediaManager,
} from '../util/mediaManager';

let instance;
export class Controller {
  constructor() {
    this.model = Model.getInstance();
    this.mm = MediaManager.getInstance();
    this.emitter = EventDispatcher.getInstance();
    this.emitter.on('TOGGLE_MUSIC', this.toggleMusic.bind(this));
    this.emitter.on('TOGGLE_SOUND', this.toggleSound.bind(this));
    this.emitter.on('SET_SCORE', this.setScore.bind(this));
    this.emitter.on('UP_POINTS', this.upPoints.bind(this));
  }

  static getInstance() {
    if (instance == null) {
      instance = new Controller();
    }
    return instance;
  }

  toggleMusic() {
    this.model.toggleMusic();
    this.mm.musicChanged();
  }

  toggleSound() {
    this.model.toggleSound();
  }

  setScore(score) {
    this.model.score = score;
  }

  upPoints(points) {
    let { score } = this.model;
    score += points;
    this.model.score = score;
  }
}