import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from './Card';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

let URL = 'https://rickandmortyapi.com/api';

export default function Home() {
  let [chars, setChars] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  function nextChar() {
    chars.shift();
    if (!chars.length) {
      //get more characters
    }
    setChars([...chars]);
  }

  function renderCharacter() {
    let char = chars[0];
    return <Card leftClick={nextChar} {...char} />;
  }

  function getCharacters() {
    return axios.get(`${URL}/character`).then(res => {
      setChars(res.data.results);
    });
  }

  return (
    <Container>
      <h2>Personajes</h2>
      <div>{renderCharacter()}</div>
    </Container>
  );
}
