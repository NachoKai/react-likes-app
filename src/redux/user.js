import { loginWithGoogle, signOutGoogle } from '../firebase';

// constants

const initialData = {
  loggedIn: false,
  fetching: false,
};

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOG_OUT = 'LOG_OUT';

// reducer

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };

    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };

    case LOG_OUT:
      return { ...initialData };

    default:
      return state;
  }
};

export default reducer;

// actions

export const logOutAction = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem('storage');
};

export const restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem('storage');
  storage = JSON.parse(storage);

  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    });
  }
};

export const doGoogleLoginAction = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOGIN,
    });

    try {
      let user = await loginWithGoogle();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
    } catch (err) {
      console.error(err);
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message,
      });
    }
  };
};

// utils

const saveStorage = storage => {
  localStorage.storage = JSON.stringify(storage);
};
