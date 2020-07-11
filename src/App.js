import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NavLink } from 'react-router-dom';
import Routes from './Routes';

const Navbar = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 1.5rem;
`;

const App = () => {
  return (
    <>
      <Navbar>
        <NavLink className='link' activeClassName='active' exact to='/'>
          Home
        </NavLink>
        <NavLink className='link' activeClassName='active' to='/favs'>
          Favorites
        </NavLink>
        <NavLink className='link' activeClassName='active' to='/login'>
          User
        </NavLink>
      </Navbar>
      <Routes />
    </>
  );
};

export default App;
