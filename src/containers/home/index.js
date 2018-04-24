import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
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
    firebase.auth().getRedirectResult()
    .then((result) => {
      if (result.credential) { this.setState({user: result.user}) }
    }).catch((error) => {
      console.log(error)
    })
  }
  render () {
    let props = this.props
    console.log(this.state)
    return (
      <div>
        <h1>Home</h1>
        <p>{this.state.user === null ? null : this.state.user.displayName}</p>
        <p>Count: {props.count}</p>

        <p>
          <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
          <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
        </p>

        <p>
          <button onClick={props.decrement} disabled={props.isDecrementing}>Decrementing</button>
          <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
        </p>

        <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>

        <p><button onClick={props.fblogin}>fb login</button></p>
        <p><button onClick={() => props.sendRecord(props.count, this.state.user.uid)}>send!</button></p>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
