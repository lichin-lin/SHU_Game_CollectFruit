import firebase from 'firebase'

export const FB_LOGIN = 'firebase/FB_LOGIN'
export const FB_LOGIN_SUCCESS = 'firebase/FB_LOGIN_SUCCESS'

const initialState = {
  account: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FB_LOGIN:
      return {
        ...state,
        account: action.payload
      }

    case FB_LOGIN_SUCCESS:
      return {
        ...state,
        account: action.payload
      }
    default:
      return state
  }
}

export const fblogin = () => {
  return dispatch => {
    dispatch({
      type: FB_LOGIN
    })

    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithRedirect(provider)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => {
        console.log('failed to sign in');
        return;
      });
  }
}

export function loginUserSuccess(dispatch, user) {
  dispatch({
    type: FB_LOGIN_SUCCESS,
    payload: user
  });
}
