import React from 'react'
import firebase from 'firebase'
import Game from './../game'
import Login from './Login'

import Cookies from 'universal-cookie'

export default class Home extends React.Component {
  state = {
    user: null,
    isLoading: true,
    isLogin: false,
    startGame: false
  }
  onStartGame = () => {
    this.setState({startGame: true})
  }

  componentWillMount () {
    const cookies = new Cookies()
    let checkUser = cookies.get('user')

    if (checkUser !== null && checkUser !== undefined) {
      let userInfo = {
        data: checkUser.user,
        accessToken: checkUser.accessToken
      }
      this.setState({user: userInfo, isLogin: true})
      this.setState({isLoading: false})
    } else {
      firebase.auth().getRedirectResult()
      .then((result) => {
        if (result.credential) {
          let userInfo = {
            data: result.user,
            accessToken: result.credential.accessToken
          }
          this.setState({user: userInfo, isLogin: true})

          const date = new Date()
          date.setHours(date.getHours() + 1)
          cookies.set('user', userInfo, {expires: date})
        }
        this.setState({isLoading: false})
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  render () {
    return (
      <div>
        { !this.state.startGame ? <Login isLoading={this.state.isLoading} isLogin={this.state.isLogin} onStartGame={this.onStartGame}/> : <Game /> }
      </div>
    )
  }
}
