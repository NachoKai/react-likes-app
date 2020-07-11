import ApolloClient, { gql } from 'apollo-boost';
import { updateDB, getFavs } from '../firebase';

// constants

const initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
  nextPage: 1,
};

const CLIENT = new ApolloClient({ uri: 'https://rickandmortyapi.com/graphql' });

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';
const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const GET_FAVS = 'GET_FAVS ';
const GET_FAVS_SUCCESS = 'GET_FAVS_SUCCESS ';
const GET_FAVS_ERROR = 'GET_FAVS_ERROR';
const UPDATE_PAGE = 'UPDATE_PAGE';

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

    case UPDATE_PAGE:
      return { ...state, nextPage: action.payload };

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
    if (!array.length) {
      getCharactersAction()(dispatch, getState);
      return;
    }
    dispatch({ type: REMOVE_CHARACTER, payload: [...array] });
  };
};

export const getCharactersAction = () => {
  return async (dispatch, getState) => {
    let query = gql`
      query($page: Int) {
        characters(page: $page) {
          info {
            pages
            next
            prev
          }
          results {
            name
            image
          }
        }
      }
    `;

    dispatch({
      type: GET_CHARACTERS,
    });

    const { nextPage } = getState().characters;
    const { data, error } = await CLIENT.query({
      query,
      variables: { page: nextPage },
    });

    if (error) {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: error,
      });
      return;
    }

    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: data.characters.results,
    });

    dispatch({
      type: UPDATE_PAGE,
      payload: data.characters.info.next ? data.characters.info.next : 1,
    });
  };
};
