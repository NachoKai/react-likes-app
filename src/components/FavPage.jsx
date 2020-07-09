import React from 'react';
import styled from 'styled-components';

import Card from './Card';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Hearth = styled.span`
  font-size: 2rem;
  margin: 10px 0 20px 0;
`;

const FavPage = ({ characters = [0] }) => {
  const renderCharacter = (char, i) => {
    return <Card key={i} />;
  };
  return (
    <Container>
      <Hearth>
        <span role='img' aria-label='hearth'>
          ❤️
        </span>
      </Hearth>
      {characters.map(renderCharacter)}
      {!characters.length && <h3>No hay personajes agregados</h3>}
    </Container>
  );
};

export default FavPage;
