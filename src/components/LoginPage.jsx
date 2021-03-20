import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { doGoogleLoginAction, logOutAction } from "../redux/user.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const fetching = useSelector(state => state.user.fetching);
  const loggedIn = useSelector(state => state.user.loggedIn);

  const doLogin = () => {
    dispatch(doGoogleLoginAction());
  };

  const doLogOut = () => {
    dispatch(logOutAction());
  };

  if (fetching) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <Container>
      {loggedIn ? (
        <>
          <h1>
            <span role="img" aria-label="bye">
              👋
            </span>
          </h1>
          <Button onClick={doLogOut}>Log Out</Button>
        </>
      ) : (
        <>
          <h1>Sign In with Google</h1>
          <Button onClick={doLogin}>Sign In</Button>
        </>
      )}
    </Container>
  );
};

export default LoginPage;

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
