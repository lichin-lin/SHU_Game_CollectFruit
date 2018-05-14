import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'redux-react-firebase'
import counter from './counter'
import game from './game'
import session from './session'

export default combineReducers({
  routing: routerReducer,
  firebaseStateReducer,
  counter,
  game,
  session,
})
