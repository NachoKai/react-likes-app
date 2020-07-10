import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  removeCharacterAction,
  addToFavoritesAction,
} from '../redux/characters';
import Card from './Card';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Home = ({ chars, removeCharacterAction, addToFavoritesAction }) => {
  const renderCharacter = () => {
    let char = chars[0];
    return (
      <Card rightClick={addFav} leftClick={removeCharacterAction} {...char} />
    );
  };

  const addFav = () => {
    return addToFavoritesAction();
  };

  return (
    <Container>
      <h2>Personajes</h2>
      <div>{renderCharacter()}</div>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    chars: state.characters.array,
  };
};

export default connect(mapStateToProps, {
  addToFavoritesAction,
  removeCharacterAction,
})(Home);
