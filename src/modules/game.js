import firebase from 'firebase'
import moment from 'moment'
export const SEND_RECORD = 'game/SEND_RECORD'

const initialState = {
  score: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_RECORD:
      return {
        ...state,
      }

    default:
      return state
  }
}

export const sendRecord = (score, uid) => {
  return dispatch => {
    dispatch({
      type: SEND_RECORD,
    })
    let result = { score, time: moment().format('YYYY-MM-DD hh:mm:ss') }
    return firebase
      .database()
      .ref(`/user/${uid}`)
      .push()
      .set(result)
  }
}
