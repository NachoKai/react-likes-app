import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { doGoogleLoginAction, logOutAction } from '../redux/user.js';

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

const LoginPage = ({
  loggedIn,
  logOutAction,
  fetching,
  doGoogleLoginAction,
}) => {
  const doLogin = () => {
    doGoogleLoginAction();
  };

  const doLogOut = () => {
    logOutAction();
  };

  if (fetching) {
    return <h2 style={{ textAlign: 'center' }}>Cargando...</h2>;
  }

  return (
    <Container>
      {loggedIn ? (
        <>
          <h1>Cierra tu sesión</h1>
          <Button onClick={doLogOut}>Cerrar Sesión</Button>
        </>
      ) : (
        <>
          <h1>Inicia Sesión con Google</h1>
          <Button onClick={doLogin}>Iniciar</Button>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = ({ user: { fetching, loggedIn } }) => {
  return {
    fetching,
    loggedIn,
  };
};

export default connect(mapStateToProps, { doGoogleLoginAction, logOutAction })(
  LoginPage
);
