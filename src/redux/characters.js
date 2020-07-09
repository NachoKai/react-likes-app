import axios from 'axios';

// constants

const initialData = {
  fetching: false,
  array: [],
  current: {},
};

const URL = 'https://rickandmortyapi.com/api/character';

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';
const REMOVE_CHARACTER = 'REMOVE_CHARACTER';

// reducer

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true };

    case GET_CHARACTERS_SUCCESS:
      return { ...state, fetching: false, array: action.payload };

    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };

    default:
      return state;
  }
}

// actions

export const removeCharacterAction = () => {
  return (dispatch, getState) => {
    let { array } = getState().characters;
    array.shift();
    dispatch({ type: REMOVE_CHARACTER, payload: [...array] });
  };
};

export const getCharactersAction = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_CHARACTERS,
    });

    try {
      let res = await axios.get(URL);
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results,
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: GET_CHARACTERS_ERROR, payload: err.response.message });
    }
  };
};
