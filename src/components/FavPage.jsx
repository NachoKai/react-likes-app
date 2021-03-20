import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Card from "./Card";

const FavPage = () => {
  const characters = useSelector(state => state.characters.favorites);

  const renderCharacter = (char, i) => {
    return <Card {...char} key={i} hide />;
  };

  return (
    <Container>
      <Hearth>
        <span role="img" aria-label="hearth">
          ❤️
        </span>
      </Hearth>
      <Characters>
        {characters.map(renderCharacter)}
        {!characters.length && <h3>No characters added</h3>}
      </Characters>
    </Container>
  );
};

export default FavPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Hearth = styled.span`
  font-size: 2rem;
  margin: 10px 0 20px 0;
`;

const Characters = styled.div``;
