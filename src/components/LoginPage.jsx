import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 20px 50px;
  border: none;
  margin: 20px 0px;
  border-radius: 5px;
  background-color: transparent;
  color: orangered;
  font-size: 1.2rem;
  box-sizing: border-box;
  transition: all 0.3s;
  cursor: pointer;
  border: 2px solid orangered;

  &:hover {
    background-color: orangered;
    color: white;
    border: 2px solid transparent;
  }
`;

export default function LoginPage() {
  return (
    <Container>
      <h1>Inicia Sesión con Google</h1>
      <h1>Cierra tu sesión</h1>
      <Button>Iniciar</Button>
      <Button>Cerrar Sesión</Button>
    </Container>
  );
}
