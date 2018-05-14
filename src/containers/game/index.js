import React from 'react'
import Phaser from 'phaser-ce'
import BootState from './BootState'
import MenuState from './MenuState'
import PlayState from './PlayState'
import EndState from './EndState'
import styled from 'styled-components'

import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'

// let gameWidth = window.innerWidth;
let gameHeight = Math.max(
  window.innerHeight,
  document.documentElement.clientHeight
)

const GameContent = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
`
class gameContainer extends React.Component {
  state = {
    game: null,
  }
  async componentDidMount() {
    const cookies = new Cookies()
    let checkUser = cookies.get('user')
    if (true || (checkUser !== null && checkUser !== undefined)) {
      await this.setState({
        game: new Phaser.Game(
          gameHeight * 9 / 16,
          gameHeight,
          Phaser.AUTO,
          'game'
        ),
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
  render() {
    return <GameContent id="game" />
  }
}

export default withRouter(gameContainer)
