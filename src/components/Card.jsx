import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-family: Avenir;
  cursor: pointer;
  min-width: 250px;
  max-width: 450px;

  span {
    color: white;
    font-size: 6rem;
    transition: all 0.3s;
  }
`;

const CardContainer = styled.div`
  background: #381460;
  color: #eee;
  width: 320px;
  padding: 15px;
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    border-radius: 1rem;
    max-height: 300px;
    width: 100%;
  }
`;

const Name = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0 10px 0;
`;

const Actions = styled.div`
  transition: all 0.3s;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  &:hover {
    opacity: 1;
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(189, 195, 199, 0.7);
  border-radius: 1rem 0 0 1rem;
  &:hover span {
    font-size: 7rem;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(246, 36, 89, 0.7);
  border-radius: 0 1rem 1rem 0;
  &:hover span {
    font-size: 7rem;
  }
`;

let rick = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

function onClick(side) {
  return () => console.log(side);
}

const Card = ({ name, image, rightClick, leftClick }) => {
  return (
    <Container>
      <CardContainer>
        <img alt='rick' src={image} />
        <Name>{name}</Name>
        <Actions>
          <Left onClick={leftClick || onClick('left')}>
            <FontAwesome name='thumbs-down' size='2x' />
          </Left>
          <Right onClick={rightClick || onClick('right')}>
            <FontAwesome name='heart' size='2x' />
          </Right>
        </Actions>
      </CardContainer>
    </Container>
  );
};

export default Card;

Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  leftClick: PropTypes.func,
  rightClick: PropTypes.func,
};

Card.defaultProps = {
  name: 'Rick Sanches',
  image: rick,
};
