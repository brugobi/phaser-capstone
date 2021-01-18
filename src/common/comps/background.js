export class Background {
  constructor(config) {
    this.scene = config.scene;
    const { game } = this.scene.sys;
    const back = this.scene.add.image(game.config.width / 2, game.config.height / 2, config.key);
    back.displayWidth = game.config.width;
    back.displayHeight = game.config.height;
  }
}