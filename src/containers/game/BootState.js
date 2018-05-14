import Phaser from 'phaser-ce'
import WebFont from 'webfontloader'

let gameWidth = window.innerWidth
let gameHeight = window.innerHeight
let images = [
  'bg-game',
  'dude1-3x',
  'green',
  'red',
  'yellow',
  'special1',
  'special2',
  'bomb',
  'bomb2',
  'five',
  'three',
  'one',
]
let audios = ['bgMusic', 'scoreMusic', 'bombMusic']

class BootState extends Phaser.State {
  init() {
    this.bgMusic = null
    this.isState2 = false
    this.isState3 = false
    this.isState4 = false
  }
  preload() {
    WebFont.load({
      google: {
        families: ['Press Start 2P'],
      },
    })
    this.input.maxPointers = 1
    this.stage.disableVisibilityChange = true

    if (this.game.device.desktop) {
      this.scale.pageAlignHorizontally = true
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      this.scale.setMinMax(480, 260, gameWidth, gameHeight)
      this.scale.forceLandscape = true
      this.scale.pageAlignHorizontally = true
    }

    this.stage.backgroundColor = '#50514F'
    this.load.crossOrigin = 'anonymous'
    images.map(image =>
      this.load.image(image, require(`../../assets/images/${image}.png`))
    )
    audios.map(audio =>
      this.load.audio(audio, require(`../../assets/audio/${audio}.mp3`))
    )

    var progressText = this.add.text(
      this.world.centerX,
      this.world.centerY,
      '0%',
      {
        fontSize: '60px',
        fill: '#ffffff',
      }
    )
    progressText.anchor.setTo(0.5, 0.5)

    this.load.onFileComplete.add(
      progress => (progressText.text = progress + '%')
    )

    this.load.onLoadComplete.add(onLoad, this)

    var deadLine = false
    setTimeout(() => {
      deadLine = true
    }, 100)

    function onLoad() {
      if (deadLine) {
        this.state.start('MenuState')
      } else {
        setTimeout(onLoad, 1000)
      }
    }
  }
}

export default BootState
