import React from 'react'
import Phaser from 'phaser-ce'
import BootState from './BootState'
import PreloaderState from './PreloaderState'

let width = window.innerWidth;
let height = window.innerHeight;
// let images = ['bg', 'dude', 'green', 'red', 'yellow', 'bomb', 'five', 'three', 'one'];
// let audios = ['bgMusic', 'scoreMusic', 'bombMusic'];
// let game = new Phaser.Game(width, height, Phaser.AUTO, '#game')

export default class gameContainer extends React.Component {
  state = {
    game: null
  }
  async componentDidMount () {
    await this.setState({
      game: new Phaser.Game(width, height, Phaser.AUTO, '#game')
    })
    this.state.game.state.add('BootState', BootState);
    this.state.game.state.add('PreloaderState', PreloaderState);
    // start
    this.state.game.state.start('BootState')
  }
  render () {
    return null
  }
}
