import React from 'react'
import Phaser from 'phaser-ce'
import BootState from './BootState'
import MenuState from './MenuState'
import PlayState from './PlayState'
import EndState from './EndState'

import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'

let width = window.innerWidth
let height = window.innerHeight

class gameContainer extends React.Component {
  state = {
    game: null
  }
  async componentDidMount () {
    const cookies = new Cookies()
    let checkUser = cookies.get('user')
    if (checkUser !== null && checkUser !== undefined) {
      await this.setState({
        game: new Phaser.Game(width, height, Phaser.AUTO, '#game')
      })
      this.state.game.state.add('BootState', BootState)
      this.state.game.state.add('MenuState', MenuState)
      this.state.game.state.add('PlayState', PlayState)
      this.state.game.state.add('EndState', EndState)
      // start
      this.state.game.state.start('BootState')
    } else {
      this.props.history.push('/')
    }
  }
  render () {
    return null
  }
}

export default withRouter(gameContainer)
