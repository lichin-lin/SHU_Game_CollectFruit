import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactFirebase } from 'redux-react-firebase'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import DevTools from './utils/Devtools'

export const history = createHistory()

const firebaseConfig = {
  apiKey: 'AIzaSyDgOf2SQqYjuT5Ceema_r1zBqe2c7_NsNI',
  authDomain: 'shu-pc-game.firebaseapp.com',
  databaseURL: 'https://shu-pc-game.firebaseio.com',
  projectId: 'shu-pc-game',
  storageBucket: '',
  messagingSenderId: '1057040115385',
}

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  reduxReactFirebase(firebaseConfig),
  applyMiddleware(...middleware),
  DevTools.instrument(),
  ...enhancers
)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
