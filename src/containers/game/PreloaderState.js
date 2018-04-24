import Phaser from 'phaser-ce'
import WebFont from 'webfontloader'

class PreloaderState extends Phaser.State {
  init() {
    this.preloadBar = null;
  }

  preload() {
    this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
    this.load.setPreloadSprite(this.preloadBar);

    WebFont.load({
      google: {
        families: ['Press Start 2P']
      }
    });
    console.log('state 2')
  }

  create() {
    // const tween = this.add.tween(this.preloadBar).to(
    //   { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true
    // );
    //
    // tween.onComplete.add(this.startMainMenuState, this);
  }

  startMainMenuState() {
    // this.state.start('MainMenuState');
  }
}

export default PreloaderState;
