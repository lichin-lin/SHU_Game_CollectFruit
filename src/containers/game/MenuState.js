import Phaser from 'phaser-ce'

class MenuState extends Phaser.State {
  preload() {
    console.log('preloading...', window.devicePixelRatio)
    if (window.devicePixelRatio >= 3) {
      console.log('3')
    } else if (window.devicePixelRatio >= 2) {
      console.log('2')
    } else {
      console.log('1')
    }
  }

  create() {
    let bg = this.add.image(0, 0, 'bg-game')
    bg.width = this.world.width
    bg.height = this.world.height

    let remind = this.add.text(
      this.world.centerX,
      this.world.centerY,
      '點擊螢幕開始遊戲!',
      {
        fontSize: '24px',
        font: 'Press Start 2P',
        fill: '#50514F',
      }
    )
    remind.anchor.setTo(0.5, 0.5)

    let man = this.add.sprite(
      this.world.centerX,
      this.world.height * 0.86,
      'dude1-3x'
    )
    let manImage = this.cache.getImage('dude1-3x')
    man.width = 80
    man.height = man.width / manImage.width * manImage.height
    man.anchor.setTo(0.5, 0.5)

    this.input.onTap.add(() => {
      this.state.start('PlayState')
    })
  }
}

export default MenuState
