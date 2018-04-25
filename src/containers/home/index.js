import React from 'react'
import firebase from 'firebase'
import Game from './../game'
import Login from './Login'

import Cookies from 'universal-cookie'

export default class Home extends React.Component {
  state = {
    user: null
  }
  componentWillMount () {
    const cookies = new Cookies()
    let checkUser = cookies.get('user')

    if (checkUser !== null && checkUser !== undefined) {
      this.setState({user: checkUser})
    } else {
      firebase.auth().getRedirectResult()
      .then((result) => {
        if (result.credential) {
          let userInfo = {
            data: result.user,
            accessToken: result.credential.accessToken
          }
          this.setState({user: userInfo})

          const date = new Date()
          date.setHours(date.getHours() + 1)
          cookies.set('user', userInfo, {expires: date})
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  render () {
    return (
      <div>
        { this.state.user === null ? <Login/> : <Game /> }
        {/* <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p> */}
      </div>
    )
  }
}
