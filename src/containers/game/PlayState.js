import Phaser from 'phaser-ce'

class PlayState extends Phaser.State {

  init () {
    this.man = null
    this.apples = null
    this.score = 0
    this.title = null
    this.scoreMusic = null
    this.bombMusic = null
    this.bgMusic = null
  }

  create () {
    this.score = 0
    this.physics.startSystem(Phaser.Physics.Arcade)
    this.physics.arcade.gravity.y = 300

    if (!this.bgMusic) {
      this.bgMusic = this.add.audio('bgMusic')
      this.bgMusic.loopFull()
    }
    this.scoreMusic = this.add.audio('scoreMusic')
    this.bombMusic = this.add.audio('bombMusic')

    let bg = this.add.image(0, 0, 'bg')
    bg.width = this.world.width
    bg.height = this.world.height

    this.man = this.add.sprite(this.world.centerX, this.world.height * 0.75, 'dude')
    let manImage = this.cache.getImage('dude')
    this.man.width = this.world.width * 0.2
    this.man.height = this.man.width / manImage.width * manImage.height
    this.man.anchor.setTo(0.5, 0.5)
    this.physics.enable(this.man)
    this.man.body.allowGravity = false

    this.title = this.add.text(this.world.centerX, this.world.height * 0.25, '0', {
        fontSize: '40px',
        fontWeight: 'bold',
        fill: '#f2bb15'
    })
    this.title.anchor.setTo(0.5, 0.5)

    let touching = false
    let appleTypes = ['green', 'red', 'yellow', 'bomb']

    this.input.onDown.add((pointer) => {
      if (Math.abs(pointer.x - this.man.x) < this.man.width / 2) touching = true
    })

    this.input.onUp.add(() => touching = false);

    this.input.addMoveCallback((pointer, x, y, isTap) => {
        if (!isTap && touching) this.man.x = x
    })

    this.apples = this.add.group()
    let appleTimer = this.time.create(true)
    appleTimer.loop(1000, () => {
      let x = Math.random() * this.world.width
      let index = Math.floor(Math.random() * appleTypes.length)
      let type = appleTypes[index]
      let apple = this.apples.create(x, 0, type)
      apple.type = type

      this.physics.enable(apple)
      let appleImg = this.cache.getImage(type)
      apple.width = this.world.width / 8
      apple.height = apple.width / appleImg.width * appleImg.height

      apple.body.collideWorldBounds = true
      apple.body.onWorldBounds = new Phaser.Signal()
      apple.body.onWorldBounds.add((apple, up, down, left, right) => {
        if (down) {
          apple.kill()
          if (apple.type !== 'bomb') {
            this.bgMusic.destroy()
            this.cache.removeSound('bgMusic')
            this.state.start('EndState', true, false, this.score)
          }
        }
      })
    })
    appleTimer.start()
  }

  update () {
    this.physics.arcade.overlap(this.man, this.apples, this.pickApple, null, this)
  }

  pickApple = (man, apple) => {
    if (apple.type === 'bomb') {
      this.bombMusic.play()
      this.state.start('EndState', true, false, this.score)
    } else {
      let point = apple.type === 'yellow' ? 5 : (apple.type === 'red' ? 3 : 1)
      let img = apple.type === 'five' ? 5 : (apple.type === 'three' ? 3 : 'one')

      let goal = this.add.image(apple.x, apple.y, img)
      let goalImg = this.cache.getImage(img)
      goal.width = apple.width
      goal.height = goal.width / (goalImg.width / goalImg.height)
      goal.alpha = 0

      let showTween = this.add.tween(goal).to({
          alpha: 1,
          y: goal.y - 20
      }, 100, Phaser.Easing.Linear.None, true, 0, 0, false)

      showTween.onComplete.add(() => {
          let hideTween = this.add.tween(goal).to({
              alpha: 0,
              y: goal.y - 20
          }, 100, Phaser.Easing.Linear.None, true, 200, 0, false)
          hideTween.onComplete.add(() => {
              goal.kill()
          })
      })
      this.score += point
      this.title.text = this.score
      apple.kill()
      this.scoreMusic.play()
    }
  }
}

export default PlayState
