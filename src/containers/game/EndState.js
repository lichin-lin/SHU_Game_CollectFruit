import Phaser from 'phaser-ce'
import firebase from 'firebase'
import moment from 'moment'

class EndState extends Phaser.State {
  init () {
    this.score = 20 // arguments[0];
  }
  async create () {
    let bg = this.add.image(0, 0, 'bg');
    bg.width = this.world.width;
    bg.height = this.world.height;

    let title = this.add.text(this.world.centerX, this.world.height * 0.25, 'game end', {
        fontSize: '40px',
        fontWeight: 'bold',
        fill: '#f2bb15'
    })
    title.anchor.setTo(0.5, 0.5)

    let scoreStr = '你的得分是：' + this.score + '分'
    let scoreText = this.add.text(this.world.centerX, this.world.height * 0.4, scoreStr, {
        fontSize: '30px',
        fontWeight: 'bold',
        fill: '#f2bb15'
    })
    scoreText.anchor.setTo(0.5, 0.5)

    let remind = this.add.text(this.world.centerX, this.world.height * 0.6, 'click anywhere', {
        fontSize: '20px',
        fontWeight: 'bold',
        fill: '#f2bb15'
    })
    remind.anchor.setTo(0.5, 0.5)

    let result = { score: this.score, time: moment().format('YYYY-MM-DD hh:mm:ss') }
    try {
      let res = await firebase.database().ref(`/user/test`).push().set(result)
      console.log(res)
    } catch(err) {
      console.log(err)
    }

    this.input.onTap.add(() => { this.state.start('MenuState') })
  }
}

export default EndState
