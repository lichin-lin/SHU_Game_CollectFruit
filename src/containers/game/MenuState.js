import Phaser from 'phaser-ce'
import WebFont from 'webfontloader'

class MenuState extends Phaser.State {
  init () {
    console.log('menu :', this)
  }
  preload() {
    console.log('preloading...')
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      }
    })
  }

  create() {
    let bg = this.add.image(0, 0, 'bg')
    bg.width = this.world.width
    bg.height = this.world.height

    let title = this.add.text(this.world.centerX, this.world.height * 0.25, '我是豐兒', {
        fontSize: '40px',
        fontWeight: 'bold',
        fontfamily: 'Press Start 2P',
        fill: '#f2bb15'
    });
    title.anchor.setTo(0.5, 0.5)

    let remind = this.add.text(this.world.centerX, this.world.centerY, 'hey! 點擊任意位置開始', {
        fontSize: '20px',
        fontfamily: 'Press Start 2P',
        fill: '#f2bb15'
    });
    remind.anchor.setTo(0.5, 0.5)

    let man = this.add.sprite(this.world.centerX, this.world.height * 0.75, 'dude')
    let manImage = this.cache.getImage('dude')
    man.width = this.world.width * 0.2
    man.height = man.width / manImage.width * manImage.height
    man.anchor.setTo(0.5, 0.5)

    this.input.onTap.add(() => { this.state.start('PlayState') })
  }
}

export default MenuState
