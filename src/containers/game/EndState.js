import Phaser from 'phaser-ce'
import firebase from 'firebase'
import moment from 'moment'

import Cookies from 'universal-cookie'

class EndState extends Phaser.State {
  init () {
    this.score = arguments[0]
  }
  async create () {
    let bg = this.add.image(0, 0, 'bg')
    bg.width = this.world.width
    bg.height = this.world.height

    let title = this.add.text(this.world.centerX, this.world.height * 0.25, '遊戲結束', {
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

    let remind = this.add.text(this.world.centerX, this.world.height * 0.6, '點擊螢幕已分享', {
        fontSize: '20px',
        fontWeight: 'bold',
        fill: '#f2bb15'
    })
    remind.anchor.setTo(0.5, 0.5)

    let result = { score: this.score, time: moment().format('YYYY-MM-DD hh:mm:ss') }
    try {
      const cookies = new Cookies()
      let user = cookies.get('user')
      if (user) {
        let res = await firebase.database().ref(`/user/${user.data.uid}`).push().set(result)
        console.log(res)
      }
    } catch(err) {
      console.log(err)
    }
    // onInputUp
    this.input.onTap.add(() => {
      let app_id = '167538313952622'
      let page_type = 'page'
      let url = 'https://lichin.me/'
      let redirect_url = 'https://lichin.me/'
      let quote = `我在世新大學畢展拿下了${this.score}分，換你們來挑戰了!`
      window.open(`https://www.facebook.com/sharer/sharer.php?quote=${quote}&u=${url}`);
      this.state.start('MenuState')
    })
  }
}

export default EndState
