import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import Game from './../game'

import Cookies from 'universal-cookie'

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

import {
  fblogin
} from '../../modules/session'

import {
  sendRecord
} from '../../modules/game'

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  account: state.session.account
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  fblogin,
  sendRecord,
  changePage: () => push('/about-us')
}, dispatch)

class Home extends React.Component {
  state = {
    user: null
  }
  componentWillMount () {
    const cookies = new Cookies()
    let checkUser = cookies.get('user')

    if (checkUser !== null && checkUser !== undefined) {
      console.log('get data from cookie:', checkUser)
    } else {
      firebase.auth().getRedirectResult()
      .then((result) => {
        if (result.credential) {
          console.log('get data from redirect')
          let userInfo = {
            data: result.user,
            accessToken: result.credential.accessToken
          }
          this.setState({user: userInfo})

          const date = new Date()
          date.setHours(date.getHours() + 1)
          const cookies = new Cookies()
          cookies.set('user', userInfo, {expires: date})
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  render () {
    let props = this.props
    return (
      <div>
        <p>{this.state.user === null ? null : this.state.user.displayName}</p>
        {/*
          <p>
            <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
            <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
          </p>
        */}
        {/* <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p> */}
        <p><button onClick={props.fblogin}>fb login</button></p>

        <Game />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
