// constants

const initialData = {
  loggedIn: false,
};

const LOGIN = 'LOGIN';

// reducer

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return;
    default:
      return state;
  }
}

// actions
