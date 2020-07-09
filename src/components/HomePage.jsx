import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { removeCharacterAction } from '../redux/characters';
import Card from './Card';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Home = ({ chars, removeCharacterAction }) => {
  const renderCharacter = () => {
    const char = chars[0];
    return <Card leftClick={removeCharacterAction} {...char} />;
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

export default connect(mapStateToProps, { removeCharacterAction })(Home);
