import axios from 'axios';
import { updateDB, getFavs } from '../firebase';

// constants

const initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
};

const URL = 'https://rickandmortyapi.com/api/character';

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';
const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const GET_FAVS = 'GET_FAVS ';
const GET_FAVS_SUCCESS = 'GET_FAVS_SUCCESS ';
const GET_FAVS_ERROR = 'GET_FAVS_ERROR';

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

    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };

    case GET_FAVS:
      return { ...state, fetching: true };

    case GET_FAVS_SUCCESS:
      return { ...state, fetching: false, favorites: action.payload };

    case GET_FAVS_ERROR:
      return { ...state, fetching: false, error: action.payload };

    default:
      return state;
  }
}

// actions

export const retreiveFavs = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_FAVS,
    });
    const { uid } = getState().user;

    try {
      const arr = await getFavs(uid);
      dispatch({
        type: GET_FAVS_SUCCESS,
        payload: [...arr],
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: GET_FAVS_ERROR, payload: err.message });
    }
  };
};

export const addToFavoritesAction = () => {
  return (dispatch, getState) => {
    const { array, favorites } = getState().characters;
    const { uid } = getState().user;
    const character = array.shift();

    favorites.push(character);
    updateDB(favorites, uid);
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: { array: [...array], favorites: [...favorites] },
    });
  };
};

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
