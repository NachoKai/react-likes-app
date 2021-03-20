import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { removeCharacterAction, addToFavoritesAction } from "../redux/characters";
import Card from "./Card";

const Home = () => {
  const dispatch = useDispatch();
  const chars = useSelector(state => state.characters.array);

  const renderCharacter = () => {
    let char = chars[0];
    return <Card rightClick={addFav} leftClick={removeCharacter} {...char} />;
  };

  const removeCharacter = () => {
    return dispatch(removeCharacterAction());
  };

  const addFav = () => {
    return dispatch(addToFavoritesAction());
  };

  return (
    <Container>
      <h2>
        <span role="img" aria-label="alien">
          👽
        </span>
      </h2>
      <div>{renderCharacter()}</div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
