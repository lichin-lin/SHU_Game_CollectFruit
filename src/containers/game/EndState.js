import Phaser from 'phaser-ce'
import firebase from 'firebase'
import moment from 'moment'
import _ from 'lodash'

import Cookies from 'universal-cookie'

class EndState extends Phaser.State {
  init () {
    this.score = arguments[0]
    this.scoreBoard = []
  }
  async create () {
    // your score
    let result = { score: this.score, time: moment().format('YYYY-MM-DD hh:mm:ss') }
    try {
      const cookies = new Cookies()
      let user = cookies.get('user')
      if (user) {
        let res = await firebase.database().ref(`/user/${user.data.displayName}`).push().set(result)
        console.log(res)
      }
    } catch(err) {
      console.log(err)
    }

    // all user score
    let scoreList = await firebase.database().ref(`/user/`).once('value').then((snapshot) => {
      return snapshot.val()
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code)
    })

    _.map(scoreList, (user, id) => {
      _.map(user, (d) => {
        this.scoreBoard.push({score: d.score, name: id})
      })
    })
    this.scoreBoard = _.sortBy(this.scoreBoard, (d) => d.score).reverse().slice(0, 5)

    let bg = this.add.image(0, 0, 'bg')
    bg.width = this.world.width
    bg.height = this.world.height

    let title = this.add.text(this.world.centerX, this.world.height * 0.5, '遊戲結束', {
        fontSize: '40px',
        fontWeight: 'bold',
        fill: '#50514F'
    })
    title.anchor.setTo(0.5, 0.5)

    let scoreStr = '你的得分是：' + this.score + '分'
    let scoreText = this.add.text(this.world.centerX, this.world.height * 0.6, scoreStr, {
        fontSize: '30px',
        fontWeight: 'bold',
        fill: '#50514F'
    })
    scoreText.anchor.setTo(0.5, 0.5)

    let remind = this.add.text(this.world.centerX, this.world.height * 0.65, '點擊螢幕以分享', {
        fontSize: '20px',
        fontWeight: 'bold',
        fill: '#50514F'
    })
    remind.anchor.setTo(0.5, 0.5)

    let scoreBoardTitle = this.add.text(this.world.centerX, this.world.height * 0.1, '排行榜', {
        fontSize: '30px',
        fontWeight: 'bold',
        fill: '#50514F'
    })
    scoreBoardTitle.anchor.setTo(0.5, 0.5)

    this.scoreBoard.map((data, i) => {
      let record = this.add.text(this.world.centerX, this.world.height * 0.15, `${i+1}. ${data.score} - ${data.name}`, {
          fontSize: '16px',
          fontWeight: 'bold',
          fill: '#50514F'
      })
      record.anchor.setTo(0.5, 0.5 - i)
    })

    // onInputUp
    this.input.onTap.add(() => {
      let url = 'https://2018shupradmooju.surge.sh'
      let quote = `我在 2018 世新公廣畢展豐年號展間拿下了 ${this.score} 分，換你來挑戰!`
      window.open(`https://www.facebook.com/sharer/sharer.php?quote=${quote}&u=${url}`)
      this.state.start('MenuState')
    })
  }
}

export default EndState
